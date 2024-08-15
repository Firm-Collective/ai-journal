import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@/components/StyledText';

interface LoginButtonProps {
  onPress: () => void;
  disabled?: boolean; // Add disabled prop
}

const LoginButton: React.FC<LoginButtonProps> = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
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
  },
  disabledButton: {
    backgroundColor: 'gray', // Change the background color to indicate disabled state
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginButton;
