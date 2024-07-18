import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface SignupButtonProps {
  onPress: () => void;
  disabled?: boolean; // Add disabled prop to interface
  style?: StyleProp<ViewStyle>;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  onPress,
  disabled,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]} // Apply styles conditionally based on disabled state
      onPress={onPress}
      disabled={disabled} // Disable button if disabled prop is true
    >
      <Text style={styles.text}>Sign Up</Text>
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
    fontFamily: 'Poppins',
  },
});

export default SignupButton;
