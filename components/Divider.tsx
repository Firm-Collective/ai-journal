import React from 'react';
import {View, StyleSheet, DimensionValue} from 'react-native';

interface Divider {
  inset: boolean;
  width: DimensionValue;
  color: string;
}

const Divider: React.FC<Divider> = ({inset, width, color}) => {
  const insetStyle = inset ? {marginHorizontal: 5} : {};

  return (
    <View
      style={[styles.divider, {width, backgroundColor: color}, insetStyle]}
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
