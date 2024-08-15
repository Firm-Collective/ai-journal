/**
 * This component represents the footer of the Authentication pages.
 */

import {View, StyleSheet} from 'react-native';
import {Text} from '../StyledText';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#1177C7',
  },
});

export default AuthFooter;
