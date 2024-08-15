/**
 * This component represents the footer of the Authentication pages.
 */

import {StyleSheet, Text} from 'react-native';
import {View} from '../Themed';

const AuthFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Terms of Use | Privacy Policy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: -1,
  },
  footerText: {
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#1177C7',
  },
});

export default AuthFooter;
