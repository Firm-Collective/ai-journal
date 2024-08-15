import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Link} from 'expo-router';
import {Text} from '@/components/StyledText';

const LoginButton = () => {
  return (
    <Link href="/login" asChild>
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
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginButton;
