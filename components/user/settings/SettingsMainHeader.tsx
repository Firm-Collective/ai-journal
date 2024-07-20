import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function SettingsMainHeader() {
  return (
    <View style={styles.imgContainer}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/onevoice-header-logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 180,
    height: 100,
  },
});
