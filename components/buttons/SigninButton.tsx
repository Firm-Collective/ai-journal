import { Link } from 'expo-router';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const SigninButton = () => {
  return (
    <Link href="/Signin" >
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 324,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default SigninButton;
