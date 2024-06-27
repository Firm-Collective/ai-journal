import * as React from 'react';
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';
import Signup from '@/components/auth/Signup';
import SignupButton from '@/components/buttons/SignupButton';
import SigninButton from '@/components/buttons/SigninButton';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.gradientIcon}
        resizeMode="cover"
        source={require('../assets/images/gradient.png')}
      />
      <Image
        style={styles.gradientIcon1}
        resizeMode="cover"
        source={require('../assets/images/gradient1.png')}
      />
      <Image
        style={styles.logosIcon}
        resizeMode="cover"
        source={require('../assets/images/logos.png')}
      />
      <Text style={styles.welcomeTo}>
        Welcome to {'\n'}
        <View style={styles.welcomeContainer}>
          <Text style={[styles.onevoice, styles.boldText]}>one</Text>
          <Text style={styles.onevoice}>voice</Text>
        </View>
        {'\n'}
        <Text style={[styles.boldText, styles.journal]}>Journal</Text>
      </Text>
      <View style={styles.buttonContainer}>
        {showSignup ? (
          <Signup />
        ) : (
          <>
            <SigninButton onPress={() => { /* Todo: handle Signin button press */ }} />
            <SignupButton onPress={() => setShowSignup(true)} />
          </>
        )}
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
    top: height / 2 - 426,
    left: -width / 2 + 26,
    opacity: 0.6,
    height: height + 100,
    width: width + 100,
  },
  welcomeTo: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  onevoice: {
    fontFamily: 'Poppins',
    fontSize: 32,
  },
  journal: {
    fontFamily: 'Poppins',
    fontSize: 36,
  },
  buttonContainer: {
    marginTop: 120,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  logosIcon: {
    marginTop: 20,
    width: 114,
    height: 114,
  },
});

export default WelcomeScreen;
