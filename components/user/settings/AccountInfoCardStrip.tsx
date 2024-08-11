import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {router} from 'expo-router';

interface AccountInfoCardStripPropType {
  toLocation: string;
  userProperty: string;
}

export default function AccountInfoCardStrip({
  toLocation,
  userProperty,
}: AccountInfoCardStripPropType) {
  const {width} = useWindowDimensions();
  const cardWidth = 0.9 * width;

  return (
    // if userProperty is 'Password', then toLocation is 'ChangePassword'
    // toDo: implement the above logic

    <Pressable
      onPress={() => {
        router.push(toLocation as any);
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
