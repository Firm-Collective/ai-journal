import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, TextSemiBold} from '../StyledText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CheckBox} from '@rneui/themed';
import SignupButton from '@/components/auth/buttons/SignupButtonFromSignup';
import {Link, router} from 'expo-router';
import {Feather} from '@expo/vector-icons';
import Divider from '../Divider';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import {signupWithEmail} from '@/lib/Auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setEmailError('This is an invalid email, please try again.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters and contain a letter and a number.'
      );
      return;
    } else {
      setPasswordError('');
    }

    const result = await signupWithEmail(email, password);
    if (!result.success) {
      setEmailError(result.message);
    } else {
      router.push('/email-verification');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setEmailError(
      !validateEmail(email) && email
        ? 'This is an invalid email, please try again.'
        : ''
    );
    setPasswordError(
      !validatePassword(password) && password
        ? 'Password must be at least 8 characters and contain a letter and a number.'
        : ''
    );
  }, [email, password]);

  const isSignupDisabled =
    !email || !password || !isChecked || !!emailError || !!passwordError;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.view}>
          <AuthHeader />
          <View style={styles.container}>
            <View style={styles.signupFieldsContainer}>
              <TextSemiBold style={styles.textCreate}>Create an Account</TextSemiBold>
              <View>
                <TextInput
                  style={[
                    styles.textInput,
                    emailError ? styles.errorInput : null,
                  ]}
                  onChangeText={(text: string) => {
                    setEmail(text);
                    setEmailError(
                      !validateEmail(text)
                        ? 'This is an invalid email, please try again.'
                        : ''
                    );
                  }}
                  value={email}
                  placeholder="Email"
                  placeholderTextColor="rgba(50, 54, 62, 1)"
                  onBlur={() => {
                    if (!validateEmail(email)) {
                      setEmailError(
                        'This is an invalid email, please try again.'
                      );
                    } else {
                      setEmailError('');
                    }
                  }}
                />
                <View>
                  <TextInput
                    style={[
                      styles.textInput,
                      passwordError ? styles.errorInput : null,
                    ]}
                    secureTextEntry={!showPassword}
                    onChangeText={(text: string) => {
                      setPassword(text);
                      setPasswordError(
                        !validatePassword(text)
                          ? 'Password must be at least 8 characters and contain a letter and a number.'
                          : ''
                      );
                    }}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="rgba(50, 54, 62, 1)"
                    onBlur={() => {
                      if (!validatePassword(password)) {
                        setPasswordError(
                          'Password must be at least 8 characters and contain a letter and a number.'
                        );
                      } else {
                        setPasswordError('');
                      }
                    }}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}
                  >
                    <Feather
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {(emailError && email) || (passwordError && password) ? (
                  <View style={styles.errorContainer}>
                    <Feather name="alert-circle" size={16} color="red" />
                    <Text style={styles.errorText}>
                      {emailError || passwordError}
                    </Text>
                  </View>
                ) : (
                  <Text style={[styles.textSmall, styles.textGrey]}>
                    Password must be at least 8 characters and contain a letter
                    and a number.
                  </Text>
                )}
                <View style={styles.containercheckbox}>
                  <CheckBox
                    checked={isChecked}
                    onPress={handleCheckboxChange}
                    style={styles.checkbox}
                    containerStyle={{marginRight: 0, paddingRight: 5}}
                  />
                  <Text style={[styles.textSmall, styles.inlineText]}>
                    <Text style={[styles.textGrey]}>
                      By clicking Sign Up, you acknowledge that you have read
                      the{' '}
                    </Text>
                    <Text style={[styles.textBlue]}>Privacy Policy</Text>
                    <Text style={[styles.textGrey]}> and agree to the </Text>
                    <Text style={[styles.textBlue]}>Terms of Service</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.signupButtonsContainer}>
              <SignupButton
                onPress={handleSignup}
                style={styles.signupButton}
                disabled={isSignupDisabled}
              />

              <View style={styles.dividerContainer}>
                <Divider inset flex={1} />
                <Text style={styles.textSmall}>or sign up with</Text>
                <Divider inset flex={1} />
              </View>

              <View style={styles.otherSignupButtonsContainer}>
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
            </View>
            <AuthFooter />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
    padding: 5,
  },
  container: {
    flex: 1,
    width: '85%',
  },
  signupFieldsContainer: {
    marginBottom: 20,
    width: '100%',
  },
  signupButtonsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  signupButton: {
    width: '100%',
  },
  dividerContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  otherSignupButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
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
    textAlign: 'left',
    marginBottom: 10,
  },
  linkText: {
    zIndex: 2,
    color: '#1177C7',
  },
  textSmall: {
    fontSize: 12,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
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
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  logoApple: {
    width: 18,
    height: 18,
  },
});
