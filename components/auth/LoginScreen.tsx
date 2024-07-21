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
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginButton from '@/components/auth/buttons/LoginButtonFromLogin';
import {Link} from 'expo-router';
import {Feather} from '@expo/vector-icons';
import Divider from '../Divider';
import AuthHeader from './AuthHeader';
<<<<<<< HEAD
import AuthFooter from './AuthFooter';
<<<<<<< HEAD
import {
  loginWithEmail,
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from '@/lib/Auth';
=======
import {loginWithEmail, signInWithApple, signInWithFacebook} from '@/lib/Auth';
=======
import {loginWithEmail, signInWithApple, signInWithFacebook, signInWithGoogle} from '@/lib/Auth';
>>>>>>> e35e5ae (merge google signin function ti Auth and update sign up/ login screen buttons)
import {useRoute} from '@react-navigation/native';
>>>>>>> 5dfdf12 (merge google signin function ti Auth and update sign up/ login screen buttons)

const {width, height} = Dimensions.get('window');

const window_width = width;
const window_height = height;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles logic after user clicks on login
   */
  const handleLogin = () => {
    loginWithEmail(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
<<<<<<< HEAD
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.view}>
          <AuthHeader />
          <View style={styles.container}>
            <View style={styles.container2}>
              <Text style={styles.textCreate}>Login</Text>
=======
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
          <View style={styles.buttonContainer1}>
            <LoginButton onPress={handleLogin} />
          </View>
          <Text style={styles.textMiddle}>Forgot Password?</Text>
        </View>

        <View style={styles.container3}>
          <View style={styles.buttonContainer2}>
            <Divider inset={true} width={100} color="black" />
            <Text style={styles.textSmall}>or sign in with</Text>
            <Divider inset={true} width={100} color="black" />
          </View>
          <View style={styles.buttonContainer3}>
            <TouchableOpacity
              onPress={() => {
                console.log('G auth : login')
                signInWithGoogle();
              }}
            >
              <View style={styles.logoGContainer}>
                <Image
                  style={[styles.logo, styles.logoG]}
                  resizeMode="contain"
                  source={require('../../assets/images/User/auth-google-logo.png')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                return signInWithFacebook(routeNow.name);
              }}
            >
>>>>>>> 5dfdf12 (merge google signin function ti Auth and update sign up/ login screen buttons)
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
                <TouchableOpacity
                  onPress={() => {
                    console.log('G auth : login');
                    signInWithGoogle();
                  }}
                >
                  <View style={styles.logoGContainer}>
                    <Image
                      style={[styles.logo, styles.logoG]}
                      resizeMode="contain"
                      source={require('../../assets/images/User/auth-google-logo.png')}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    return signInWithFacebook();
                  }}
                >
                  <View>
                    <Image
                      style={styles.logo}
                      resizeMode="contain"
                      source={require('../../assets/images/User/auth-facebook-logo.jpg')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Apple auth : login');
                    if (Platform.OS === 'ios') {
                      return signInWithApple;
                    } else {
                      // toDo: implement android apple login
                      Alert.alert(
                        'Apple auth is currently available for ios only'
                      );
                    }
                  }}
                >
                  <View style={styles.logoAppleContainer}>
                    <Image
                      style={[styles.logo, styles.logoApple]}
                      resizeMode="contain"
                      source={require('../../assets/images/User/auth-apple-logo.png')}
                    />
                  </View>
                </TouchableOpacity>
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
  textBottom: {
    marginTop: 120,
    fontSize: 12,
  },
  textBottom2: {
    marginTop: 180,
    fontSize: 12,
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
