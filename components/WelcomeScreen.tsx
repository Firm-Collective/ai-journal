import * as React from 'react';
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
import SignupButton from '@/components/buttons/SignupButton';
import SigninButton from '@/components/buttons/SigninButton';

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
        <Text style={styles.welcomeTo}>Welcome to</Text>
        <Image
          style={styles.onevoiceJournalLogo1}
          source={require('../assets/images/welcome-screen/onevoice-journal-logo-text.png')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonContainer}>
        <SigninButton />
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
  welcomeTo: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginTop: 50,
  },
  onevoiceJournalLogo1: {
    width: 215,
    height: 87,
  },
  buttonContainer: {
    marginTop: 120,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  logosIcon: {
    marginTop: 20,
    width: 114,
    height: 114,
  },
});

export default WelcomeScreen;
