// Divider.tsx
import React from 'react';
import {View, StyleSheet, DimensionValue} from 'react-native';

interface DividerProps {
  inset?: boolean;
  width?: DimensionValue | 'flex';
  color?: string;
  flex?: number;
}

const Divider: React.FC<DividerProps> = ({
  inset = false,
  width = 'flex',
  color = 'black',
  flex = 1,
}) => {
  const insetStyle = inset ? {marginHorizontal: 10} : {};
  const flexStyle = width === 'flex' ? {flex} : {width};

  return (
    <View
      style={[styles.divider, {backgroundColor: color}, insetStyle, flexStyle]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 10,
  },
});

export default Divider;
