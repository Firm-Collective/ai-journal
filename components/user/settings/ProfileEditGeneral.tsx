import {
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

interface ProfileEditGeneralProps {
  userProperty: string;
  userPropertyValue: React.JSX.Element;
  handleEdit: () => void;
}

const ProfileEditGeneral: React.FC<ProfileEditGeneralProps> = ({
  userProperty,
  userPropertyValue,
  handleEdit,
}) => {
  const {width: windowWidth} = useWindowDimensions();
  return (
    <View style={[styles.container, {width: windowWidth * 0.9}]}>
      <View style={{flex: 10}}>
        <Text style={[styles.propertyText]}>{userProperty}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {userPropertyValue}
        </View>
      </View>
      <Pressable onPress={handleEdit} style={{flex: 1}}>
        <Image
          style={styles.pencilCont}
          source={require('../../../assets/images/User/edit-pencil.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#DEE5EE',
    borderRadius: 20,
  },
  pencilCont: {
    width: 30,
    resizeMode: 'contain',
  },
  propertyText: {
    fontWeight: 'bold',
  },
});

export default ProfileEditGeneral;
