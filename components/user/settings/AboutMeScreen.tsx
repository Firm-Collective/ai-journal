import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UserAvatar from '@/components/user/settings/UserAvatar';
import ProfileEditGeneral from '@/components/user/settings/ProfileEditGeneral';
import {ContainedUserAttribute} from '@/components/user/settings/ContainedUserAttribute';
import {useState} from 'react';
import EditModal from '@/components/user/settings/DummyEditModal';
import {supabase} from '@/lib/supabase';
import useFetchUser from '@/lib/hooks/useFetchUser';

export default function AboutMeScreen() {
  const [userFullName, setUserFullName] = useState('John Doe');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInitialValue, setModalInitialValue] = useState('');
  const user = useFetchUser();

  const userLanguages = ['🇧🇷 Brazil', '🇵🇾 Paraguay'];
  const userAffiliations = ['Bethel', 'BSSM', 'Firm'];
  const userInterests = ['Music', 'Sports', 'Concerts'];

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

  const openModal = (title: string, initialValue: string) => {
    setModalTitle(title);
    setModalInitialValue(initialValue);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const submitNewName = async (userNewName: string) => {
    const fullName = userNewName.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[1];

    const {error} = await supabase
      .from('users')
      .update({first_name: firstName, last_name: lastName})
      .eq('id', user?.id);

    if (error) {
      console.log('An error updating occurred', error);
    } else {
      console.log('New name updated');
    }
  };

  const handleSave = async (newValue: string) => {
    if (modalTitle === 'Name') {
      setUserFullName(newValue);
      await submitNewName(newValue);
    }
    closeModal();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <EditModal
        visible={isModalVisible}
        initialValue={modalInitialValue}
        onClose={closeModal}
        onSave={handleSave}
        title={modalTitle}
      />
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
              openModal('Name', userFullName);
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
              console.log('My affiliations are about to change');
            }}
          />
        </View>
        <View>
          <ProfileEditGeneral
            userProperty={'Interests'}
            userPropertyValue={interests}
            handleEdit={() => {
              console.log('My interests are about to change');
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
  bottomSheetContent: {
    padding: 16,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    width: '100%',
  },
});
