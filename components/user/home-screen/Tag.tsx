import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextRegular} from '@/components/StyledText';

type TagProps = {name: string};

export default function Tag({name}: TagProps) {
  return (
    <View style={styles.container}>
      <TextRegular style={styles.tagName}>{name}</TextRegular>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4.09,
    backgroundColor: 'rgba(234, 216, 250, 1)',
    paddingHorizontal: 5.1,
    paddingVertical: 4.6,
  },
  tagName: {
    color: 'rgba(81, 9, 147, 1)',
    fontSize: 10,
    fontWeight: 400,
  },
});
