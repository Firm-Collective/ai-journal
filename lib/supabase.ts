import {AppState} from 'react-native';
import 'react-native-url-polyfill';
import * as SecureStore from 'expo-secure-store';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as aesjs from 'aes-js';
import 'react-native-get-random-values';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Combination of SecureStore and AsyncStorage to securely handling storage and retrieval
 */
class LargeSecureStore {
  /**
   * Encrypts a value and stores the encryption key in SecureStore.
   * @param {string} key - The key to identify the stored value.
   * @param {string} value - The value to be encrypted and stored.
   * @returns {Promise<string>} - The encrypted value in hexadecimal format.
   * @private
   */
  private async _encrypt(key: string, value: string): Promise<string> {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1)
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey)
    );

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  /**
   * Decrypts a value using the encryption key stored in SecureStore.
   * @param {string} key - The key to identify the stored encryption key.
   * @param {string} value - The encrypted value to be decrypted.
   * @returns {Promise<string | null>} - The decrypted value.
   * @private
   */
  private async _decrypt(key: string, value: string): Promise<string | null> {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) {
      return encryptionKeyHex;
    }

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1)
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  /**
   * Retrieves a value from storage and decrypts it.
   * @param {string} key - The key to identify the stored value.
   * @returns {Promise<string | null>} - The decrypted value or null if not found.
   */
  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) {
      return encrypted;
    }

    return await this._decrypt(key, encrypted);
  }

  /**
   * Removes a value from both AsyncStorage and SecureStore.
   * @param {string} key - The key to identify the stored value.
   * @returns {Promise<void>}
   */
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }

  /**
   * Encrypts and stores a value in AsyncStorage.
   * @param {string} key - The key to identify the stored value.
   * @param {string} value - The value to be encrypted and stored.
   * @returns {Promise<void>}
   */
  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);

    await AsyncStorage.setItem(key, encrypted);
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
