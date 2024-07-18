/**
 * This component represents the footer of the Authentication pages.
 */

import {View, StyleSheet, Text} from 'react-native';

const AuthFooter = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Terms of Use | Privacy Policy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#1177C7',
  },
});

export default AuthFooter;
