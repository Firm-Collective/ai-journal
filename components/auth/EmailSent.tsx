import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const EmailSent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={require('/Users/jbeaudry/Desktop/Develop_For_Good/ai-journal/assets/OneVoiceLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Sent!</Text>
      <Text style={styles.message}>
        An email is on its way to your inbox with a reset link.
      </Text>
      <Text style={styles.subtitle}>Didn't receive an email?</Text>
      <TouchableOpacity>
        <Text style={styles.resendLink}>Resend link</Text>
      </TouchableOpacity>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>or sign in with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialIcons}>
        <TouchableOpacity>
          <Image
            source={require('/Users/jbeaudry/Desktop/Develop_For_Good/ai-journal/assets/google-icon.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('/Users/jbeaudry/Desktop/Develop_For_Good/ai-journal/assets/facebook-icon.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('/Users/jbeaudry/Desktop/Develop_For_Good/ai-journal/assets/apple-icon.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('/signup')}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.terms}>
        <Text style={styles.termsText}>Terms of Use | Privacy Policy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  resendLink: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 30,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    color: '#007BFF',
  },
  terms: {
    marginTop: 'auto',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
  },
});

export default EmailSent;
