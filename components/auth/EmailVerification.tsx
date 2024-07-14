import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

const windowHeight = Dimensions.get('window').height;

const EmailVerification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Verification email sent!</Text>

        {/* Contains the email logo icon */}
        <Image
          source={require('../../assets/images/email-icon.png')}
          style={styles.emailIcon}
        />

        <Text style={styles.instruction}>
          Please click on the link that has just been sent to your email address
          to verify your email and continue the registration process.
        </Text>

        <Text style={styles.resendInstruction}>
          Didn't receive an email? Check your spam folder or
        </Text>

        <TouchableOpacity>
          <Text style={styles.resendLink}>Re-send email</Text>
        </TouchableOpacity>
      </View>
      <AuthFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    minHeight: windowHeight,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  emailIcon: {
    width: 80,
    height: 45,
    marginBottom: 35,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    width: 282,
  },
  resendInstruction: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  resendLink: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default EmailVerification;
