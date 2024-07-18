import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
interface SignupButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SignupButton: React.FC<SignupButtonProps> = ({onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>Sign Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});

export default SignupButton;
