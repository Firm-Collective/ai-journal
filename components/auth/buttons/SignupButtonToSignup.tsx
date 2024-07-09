import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

const SignupButton = () => {
  return (
<<<<<<< HEAD:components/auth/buttons/SignupButtonToSignup.tsx
    <Link href="/(auth)/signup" asChild>
=======
    <Link href="/email-verification" asChild>
>>>>>>> 932fb56 (had to redo verification page):components/welcome-screen/buttons/SignupButton.tsx
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 324,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default SignupButton;
