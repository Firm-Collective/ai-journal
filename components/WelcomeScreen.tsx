import React from 'react';
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
import SignupButton from '@/components/auth/buttons/SignupButtonToSignup';
import LoginButton from '@/components/auth/buttons/LoginButtonToLogin';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.gradientIcon}
        resizeMode="cover"
        source={require('../assets/images/welcome-screen/gradient.png')}
      />
      <Image
        style={styles.gradientIcon1}
        resizeMode="cover"
        source={require('../assets/images/welcome-screen/gradient1.png')}
      />
      <View style={styles.welcomeContainer}>
        <Image
          style={styles.logosIcon}
          resizeMode="contain"
          source={require('../assets/images/welcome-screen/logos.png')}
        />
        <Image
          style={styles.onevoiceJournalLogo}
          source={require('../assets/images/welcome-screen/onevoice-journal-updated-logo-text-only.png')}
          resizeMode="cover"
        />
        <Text style={styles.sloganText}>Your Faith. Guided by AI.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LoginButton />
        <SignupButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins',
  },
  gradientIcon: {
    position: 'absolute',
    top: -21,
    left: -width / 2,
    opacity: 0.6,
    height: height + 100,
    width: width + 100,
  },
  gradientIcon1: {
    position: 'absolute',
    top: height / 2 - 456,
    opacity: 0.6,
    height: height + 100,
    width: width + 100,
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logosIcon: {
    width: 114,
    height: 114,
  },
  onevoiceJournalLogo: {
    width: 288,
    height: 105,
    marginTop: 30,
    marginBottom: 20,
  },
  sloganText: {
    fontSize: 16.5,
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    marginTop: 120,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
});

export default WelcomeScreen;
