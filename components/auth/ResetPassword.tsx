// app/(auth)/reset-password.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {supabase} from '/Users/jbeaudry/Desktop/Develop For Good/ai-journal/lib/supabase'; // Adjust the path if needed

export default function ForgotPasswordScreen () {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    // Validate the email input
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    // Call Supabase to send the password reset email
    const {error} = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      // Handle error
      Alert.alert('Error', error.message);
    } else {
      // Handle success
      Alert.alert(
        'Success',
        'Password reset email sent. Please check your inbox.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Send Password Reset Email" onPress={handleResetPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
});

// export default ForgotPasswordScreen;
