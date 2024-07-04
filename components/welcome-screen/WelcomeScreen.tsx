import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import SigninButton from '@/components/welcome-screen/buttons/SigninButton';
import SignupButton from '@/components/welcome-screen/buttons/SignupButton';

const {width, height} = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/welcome-screen/logos.png')}
          style={styles.imageCont}
          resizeMode={'contain'}
        ></Image>
      </View>
      <Text style={styles.logoTextGreet}>Welcome to </Text>
      <View>
        <Image
          source={require('../../assets/images/welcome-screen/onevoice-journal-logo-text.png')}
          resizeMode={'contain'}
          style={{height: 120}}
        ></Image>
      </View>
      <View>
        <Text style={styles.subHeroText}>
          Your Faith. Your Story. Guided by AI.
        </Text>
      </View>
      <View style={styles.btnCont}>
        <SigninButton></SigninButton>
        <SignupButton></SignupButton>
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
  imageCont: {
    height: 'auto',
    aspectRatio: 16 / 9,
    width: windowWidth - 40,
  },
  logoTextBold: {
    fontWeight: 'bold',
  },
  logoTextGreet: {
    textAlign: 'center',
    fontFamily: 'Poppins-Thin',
    fontSize: 30,
    color: '#272727',
    letterSpacing: 3,
  },
  btnCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 90,
  },
  subHeroText: {
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});

export default WelcomeScreen;
