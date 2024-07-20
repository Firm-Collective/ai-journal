import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import UserAvatar from '@/components/user/settings/UserAvatar';
import ProfileEditGeneral from '@/components/user/settings/ProfileEditGeneral';
import {ContainedUserAttribute} from '@/components/user/settings/ContainedUserAttribute';
import {useState} from 'react';

export default function AboutMeScreen() {
  const [userFullName, setUserFullName] = useState('John Doe');

  const userLanguages = ['🇧🇷 Brazil', '🇵🇾 Paraguay'];
  const userAffiliations = ['Bethel', 'BSSM', 'Firm'];
  const userInterests = ['Music', 'Sports', 'Concerts'];

  console.log('Name is ', userFullName);

  const name = <Text>{userFullName}</Text>;
  const about = (
    <Text>
      {'I am a devoted Christian who finds great joy and purpose through my faith. My' +
        ' beliefs inspire'}
    </Text>
  );
  const languages = <ContainedUserAttribute attributes={userLanguages} />;
  const affiliations = <ContainedUserAttribute attributes={userAffiliations} />;
  const interests = <ContainedUserAttribute attributes={userInterests} />;

  const handleNameChange = async () => {
    console.log('Changing names');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={[styles.contentWrapper]}>
        <View style={[styles.avatarTopContainer]}>
          <UserAvatar />
          <Text>Edit picture</Text>
        </View>
        <View>
          <ProfileEditGeneral
            userProperty={'Name'}
            userPropertyValue={name}
            handleEdit={() => {
              console.log('My name is about to change');
            }}
          />
        </View>
        <View>
          <ProfileEditGeneral
            userProperty={'About'}
            userPropertyValue={about}
            handleEdit={() => {
              console.log('My description is about to change');
            }}
          />
        </View>
        <View>
          <ProfileEditGeneral
            userProperty={'Speaks'}
            userPropertyValue={languages}
            handleEdit={() => {
              console.log('My tongue is about to change');
            }}
          />
        </View>
        <View>
          <ProfileEditGeneral
            userProperty={'Affiliations'}
            userPropertyValue={affiliations}
            handleEdit={() => {
              console.log('My name is about to change');
            }}
          />
        </View>
        <View>
          <ProfileEditGeneral
            userProperty={'Interests'}
            userPropertyValue={interests}
            handleEdit={() => {
              console.log('My name is about to change');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 8,
  },
  avatarTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
