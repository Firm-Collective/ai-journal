import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SignupButtonProps {
  onPress: () => void;
}

const SignupButton: React.FC<SignupButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Sign up</Text>
    </TouchableOpacity>
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
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default SignupButton;
