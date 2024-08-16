// app/(auth)/reset-password.tsx
import {FontAwesome} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {supabase} from '../../lib/supabase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://jb2700.github.io/Dev_for_good/',
    });
    console.log(data);

    if (error) {
      // Handle error
      Alert.alert('Error', error.message);
    } else {
      // Handle success
      Alert.alert(
        'Success',
        'Password reset email sent. Please check your inbox.'
      );
      router.push(`/(auth)/email-sent?email=${encodeURIComponent(email)}`);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/OneVoiceLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Password Reset</Text>
      <Text style={styles.subtitle}>
        Enter your email address, and we'll send you a link to reset your
        password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or sign in with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.signUpText}>
        Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
      </Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Terms of Use | Privacy Policy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 16,
    color: '#000',
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  signUpText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
