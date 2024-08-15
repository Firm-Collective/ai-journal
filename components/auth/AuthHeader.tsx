/**
 * This component represents the header of the Authentication pages.
 */

import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {router} from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const AuthHeader = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButtonContainer}>
        <Icon
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.navigate('/')}
        />
      </TouchableOpacity>

      {/* Contains the header logo */}
      <Image
        source={require('../../assets/images/onevoice-journal-updated-logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
  },
});

export default AuthHeader;
