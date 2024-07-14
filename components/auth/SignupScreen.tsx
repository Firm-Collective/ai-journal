import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CheckBox} from '@rneui/themed';
import SignupButton from '@/components/auth/buttons/SignupButtonFromSignup';
import {Link, router} from 'expo-router';
import {Feather} from '@expo/vector-icons';
import Divider from '../Divider';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import {signupWithEmail} from '@/lib/Auth';

const {width, height} = Dimensions.get('window');

const window_width = width;
const window_height = height;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  /**
   * Handles the logic after a user clicks the signup button
   */
  const handleSignup = async () => {
    const isSuccess = await signupWithEmail(email, password);

    // if success, route to email verification page
    if (isSuccess) router.push('/email-verification');
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={[styles.view]}>
      <AuthHeader />
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.textCreate}>Create an Account</Text>
          <View>
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text: string) => setEmail(text)}
                value={email}
                placeholder="Email"
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!showPassword}
                onChangeText={(text: string) => setPassword(text)}
                value={password}
                placeholder="Password"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 15,
                  right: 10,
                  padding: 5,
                }}
                onPress={togglePasswordVisibility}
              >
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.textSmall, styles.textGrey]}>
              Password must be at least 8 characters and contain a letter and a
              number.
            </Text>
            <View style={styles.containercheckbox}>
              <CheckBox
                checked={isChecked}
                onPress={handleCheckboxChange}
                style={styles.checkbox}
                containerStyle={{marginRight: 0, paddingRight: 5}}
              />
              <Text style={[styles.textSmall, styles.inlineText]}>
                <Text style={[styles.textGrey]}>
                  By clicking Sign Up, you acknowledge that you have read the
                </Text>
                <Text style={[styles.textBlue]}> Privacy Policy</Text>
                <Text style={[styles.textGrey]}> and agree to the</Text>
                <Text style={[styles.textBlue]}> Terms of Service</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.container3]}>
          <View style={[styles.buttonContainer1]}>
            <SignupButton onPress={handleSignup} />
          </View>
          <View style={[styles.buttonContainer2]}>
            <Divider inset={true} width={100} color="black" />
            <Text style={[styles.textSmall]}>or sign up with</Text>
            <Divider inset={true} width={100} color="black" />
          </View>
          <View style={[styles.buttonContainer3]}>
            <View style={styles.logoGContainer}>
              <Image
                style={[styles.logo, styles.logoG]}
                resizeMode="contain"
                source={require('../../assets/images/User/auth-google-logo.png')}
              />
            </View>
            <Image
              style={[styles.logo]}
              resizeMode="contain"
              source={require('../../assets/images/User/auth-facebook-logo.jpg')}
            />
            <View style={styles.logoAppleContainer}>
              <Image
                style={[styles.logo, styles.logoApple]}
                resizeMode="contain"
                source={require('../../assets/images/User/auth-apple-logo.png')}
              />
            </View>
          </View>
          <Text style={[styles.textSmall, styles.textGrey]}>
            Already have an account?{' '}
            <Link href={'/login'} asChild>
              <Text style={styles.linkText}>Log in</Text>
            </Link>
          </Text>
          <AuthFooter />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    backgroundColor: 'white',
    minWidth: window_width,
    minHeight: window_height,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 15,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 0,
  },
  containercheckbox: {
    left: -20,
    flexDirection: 'row',
    width: '88%',
  },
  textInput: {
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    paddingTop: 3,
    fontFamily: 'Poppins',
  },
  textCreate: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  linkText: {
    color: '#1177C7',
  },
  textSmall: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  textGrey: {
    color: '#6C757D',
  },
  textBlue: {
    color: '#186DF7',
  },
  inlineText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 13,
  },
  container2: {
    flex: 6,
    flexDirection: 'column',
    alignSelf: 'center',
    width: '80%',
  },
  container3: {
    flex: 6.8,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  buttonContainer1: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  buttonContainer2: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  buttonContainer3: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
    gap: 10,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 30,
  },
  logoGContainer: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  logoG: {
    width: 25,
    height: 25,
  },
  logoAppleContainer: {
    position: 'relative',
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: 'grey',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  logoApple: {
    position: 'relative',
    width: 18,
    height: 18,
    zIndex: 2,
  },
});
