import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {router} from 'expo-router';
import {supabase} from '@/lib/supabase';

interface SettingsMainStripCardProps {
  cardStyles: {};
  toLocation: string;
  iconSrc: ImageSourcePropType;
  text: string;
}

export default function SettingsMainStripCard({
  cardStyles,
  toLocation,
  iconSrc,
  text,
}: SettingsMainStripCardProps) {
  const {width} = useWindowDimensions();
  const cardWidth = 0.9 * width;

  return (
    <Pressable
      onPress={async () => {
        if (text === 'Log out') await supabase.auth.signOut();
        router.push(toLocation as any);
      }}
      style={({pressed}) => [
        styles.pressableStyles,
        {width: cardWidth},
        {maxWidth: cardWidth},
        cardStyles,
        {backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'},
      ]}
      android_ripple={{
        color: 'rgb(210, 230, 255)',
        borderless: false,
        radius: 10,
      }}
    >
      <View style={styles.iconText}>
        <Image source={iconSrc} style={styles.iconLogo} />
        <Text>{text}</Text>
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
    padding: 5,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flex: 2,
    gap: 20,
  },
  iconLogo: {
    width: 18,
    resizeMode: 'contain',
  },
  arrowLogo: {
    resizeMode: 'contain',
    width: 18,
  },
});
