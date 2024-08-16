import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {supabase} from '../../lib/supabase';
import {FontAwesome} from '@expo/vector-icons';
import {useGlobalSearchParams} from 'expo-router';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const global = useGlobalSearchParams();

  const accessToken = global.access_token || '';
  const refreshToken = global.refresh_token || '';

  const handlePasswordReset = async () => {
    if (newPassword !== repeatNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
        const accessTokenString = Array.isArray(accessToken)
          ? accessToken[0]
          : accessToken;
        const refreshTokenString = Array.isArray(refreshToken)
          ? refreshToken[0]
          : refreshToken;
      // Use the token to reset the password
      const {error: signInError} = await supabase.auth.setSession({
        access_token: accessTokenString,
        refresh_token: refreshTokenString,
      });

      if (signInError) {
        Alert.alert('Error', 'Log in Failed');
        return;
      }

      const {error} = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Password updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'not successful');
      console.error('Password update error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/OneVoiceLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>New password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          placeholder="Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(prev => !prev)}
        >
          <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showRepeatPassword}
          placeholder="Password"
          value={repeatNewPassword}
          onChangeText={setRepeatNewPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowRepeatPassword(prev => !prev)}
        >
          <FontAwesome
            name={showRepeatPassword ? 'eye' : 'eye-slash'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.passwordCriteria}>
        Password must be at least 8 characters and contain a letter and a
        number.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  passwordCriteria: {
    fontSize: 12,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default PasswordReset;
