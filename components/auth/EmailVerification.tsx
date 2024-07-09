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
import {Link} from 'expo-router';

const windowHeight = Dimensions.get('window').height;

const EmailVerification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href={'/'} asChild>
          <TouchableOpacity style={styles.backButtonContainer}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        </Link>
        <Image
          source={require('../../assets/images/onevoice-journal-logo-1.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Verification email sent!</Text>
        {/* Image here */}
        <Image
          source={require('../../assets/images/email-icon.png')}
          style={styles.emailIcon}
        />

        <Text style={styles.instruction}>
          Please click on the link that has just been sent to your email address
          to verify your email and continue the registration process.
        </Text>

        <Text style={styles.resendInstruction}>
          Didn't receieve an email? Check your spam folder or
        </Text>

        <TouchableOpacity>
          <Text style={styles.resendLink}>Re-send email</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Terms of Use | Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    minHeight: windowHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 15,
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
    marginLeft: 10,
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
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
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  footerText: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default EmailVerification;
