import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {TextRegular} from './StyledText';
import React from 'react';

export interface StyledButtonProps {
  styles?: StyleProp<ViewStyle>;
  onPress: () => void;
  children?: React.ReactNode;
}

export default function StyledButton({
  styles,
  onPress,
  children,
}: StyledButtonProps) {
  return (
    <TouchableOpacity style={styles} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
