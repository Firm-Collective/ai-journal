import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginButton from '@/components/auth/buttons/LoginButtonFromLogin';
import {Link} from 'expo-router';
import {Feather} from '@expo/vector-icons';
import Divider from '../Divider';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import {loginWithEmail} from '@/lib/Auth';

const {width, height} = Dimensions.get('window');

const window_width = width;
const window_height = height;

export default function LoginScreen() {
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error message

  /**
   * Handles logic after user clicks on login
   */
  const handleLogin = async () => {
    const result = await loginWithEmail(email, password);
    if (!result.success) {
      setErrorMessage(result.message); // Set the specific error message here
    } else {
      setErrorMessage('');
      // Redirect to another screen or perform other actions upon successful login
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.view}>
          <AuthHeader />
          <View style={styles.container}>
            <View style={styles.container2}>
              <Text style={styles.textCreate}>Login</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text: string) => setEmail(text)}
                  value={email}
                  placeholder="Email"
                  placeholderTextColor="rgba(50, 54, 62, 1)"
                />
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={!showPassword}
                  onChangeText={(text: string) => setPassword(text)}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor="rgba(50, 54, 62, 1)"
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
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text> // Conditionally render error message
              ) : null}
              <View style={styles.buttonContainer1}>
                <LoginButton onPress={handleLogin} />
              </View>
              <Text style={styles.textMiddle}>Forgot Password?</Text>
            </View>

            <View style={styles.container3}>
              <View style={styles.buttonContainer2}>
                <Divider inset flex={1} />
                <Text style={styles.textSmall}>or sign in with</Text>
                <Divider inset flex={1} />
              </View>
              <View style={styles.buttonContainer3}>
                <View style={styles.logoGContainer}>
                  <Image
                    style={[styles.logo, styles.logoG]}
                    resizeMode="contain"
                    source={require('../../assets/images/User/auth-google-logo.png')}
                  />
                </View>
                <Image
                  style={styles.logo}
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
              <Text style={[styles.textSmall, styles.greyText]}>
                Don’t have an account?{' '}
                <Link href="/signup">
                  <Text style={styles.linkText}>Sign Up</Text>
                </Link>
              </Text>
              <AuthFooter />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    justifyContent: 'space-around',
    padding: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInput: {
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
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
    marginTop: 10,
    marginBottom: 10,
  },
  linkText: {
    color: '#1177C7',
  },
  textSmall: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  greyText: {
    color: 'grey',
  },
  textMiddle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#696969',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  container2: {
    flex: 6,
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '80%',
  },
  container3: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  buttonContainer1: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  buttonContainer2: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 0,
  },
  buttonContainer3: {
    marginTop: 20,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 30,
    padding: 10,
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
  backButtonContainer: {
    position: 'absolute',
    left: 15,
  },
  backButton: {
    fontSize: 35,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 0,
    marginBottom: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#1177C7',
  },
});
