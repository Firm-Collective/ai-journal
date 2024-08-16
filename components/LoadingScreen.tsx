import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/OneVoiceLogo.png')}
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Hang tight....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default LoadingScreen;
