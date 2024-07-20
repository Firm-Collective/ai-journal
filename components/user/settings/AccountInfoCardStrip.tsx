import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {navigate} from 'expo-router/build/global-state/routing';
import {router} from 'expo-router';

export default function AccountInfoCardStrip({toLocation, userProperty}) {
  const {width} = useWindowDimensions();
  const cardWidth = 0.9 * width;

  return (
    <Pressable
      onPress={() => {
        console.log('Strip password/about me');
      }}
      style={({pressed}) => [
        styles.pressableStyles,
        {width: cardWidth},
        {maxWidth: cardWidth},
        {backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'},
      ]}
      android_ripple={{
        color: 'rgb(210, 230, 255)',
        borderless: false,
        radius: 10,
      }}
    >
      <View>
        <Text>{userProperty}</Text>
      </View>
      <Image
        style={styles.arrowLogo}
        source={require('../../../assets/images/User/right-arrow.png')}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableStyles: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    flexWrap: 'nowrap',
    padding: 15,
    borderColor: '#E9E9E9',
    borderWidth: 2,
    justifyContent: 'space-between',
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  arrowLogo: {
    resizeMode: 'contain',
    width: 20,
  },
});
