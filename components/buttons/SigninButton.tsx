import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface SigninButtonProps {
  onPress: () => void;
}

const SigninButton: React.FC<SigninButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
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
