import {Image, View, StyleSheet} from 'react-native';

export default function UserAvatar() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require('../../../assets/images/User/defaultAvatar.jpeg')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    resizeMode: 'cover',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
