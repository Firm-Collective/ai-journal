import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import SigninButton from '@/components/welcome-screen/buttons/SigninButton';
import SignupButton from '@/components/welcome-screen/buttons/SignupButton';
import GradientBackground from '@/components/welcome-screen/BackgroundGradient';

const {width} = Dimensions.get('window');

const WelcomeScreen = () => {
  return (
    <GradientBackground>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/welcome-screen/logos.png')}
          style={styles.imageCont}
          resizeMode={'contain'}
        />
        <Text style={styles.logoTextGreet}>Welcome to</Text>
        <Image
          source={require('../../assets/images/welcome-screen/onevoice-journal-logo-text.png')}
          resizeMode={'contain'}
          style={styles.logoImage}
        />
        <Text style={styles.subHeroText}>
          Your Faith. Your Story. Guided by AI.
        </Text>
        <View style={styles.btnCont}>
          <SigninButton />
          <SignupButton />
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageCont: {
    height: 'auto',
    aspectRatio: 16 / 9,
    width: width - 40,
  },
  logoImage: {
    height: 120,
    width: '100%',
  },
  logoTextGreet: {
    textAlign: 'center',
    fontFamily: 'Poppins-Thin',
    fontSize: 30,
    color: '#272727',
    letterSpacing: 3,
  },
  btnCont: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 90,
    width: '100%',
  },
  subHeroText: {
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
