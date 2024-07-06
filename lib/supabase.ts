import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import {createClient} from '@supabase/supabase-js';
import {deflate, inflate} from 'pako';
import {encode as btoa, decode as atob} from 'base-64';

const CompressedSecureStore = {
  getItem: async (key: string) => {
    const compressed = await SecureStore.getItemAsync(key);
    if (compressed) {
      const binaryString = atob(compressed);
      const charArray = binaryString.split('').map(x => x.charCodeAt(0));
      const byteArray = new Uint8Array(charArray);
      const decompressed = inflate(byteArray, {to: 'string'});
      return decompressed;
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    const compressed = deflate(value);
    const base64 = btoa(
      String.fromCharCode.apply(null, Array.from(compressed))
    );
    return SecureStore.setItemAsync(key, base64);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// TODO: storage option to store supabase cookie

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: CompressedSecureStore,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
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
