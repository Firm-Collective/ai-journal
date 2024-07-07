import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import SettingsMainHeader from '@/components/user/settings/SettingsMainHeader';
import UserAvatar from '@/components/user/settings/UserAvatar';
import useFetchUser from '@/lib/hooks/useFetchUser';
import {supabase} from '@/lib/supabase';
import {useEffect, useState} from 'react';
import SettingsMainStripCard from '@/components/user/settings/SettingsMainStripCard';

interface userData {
  last_name: string;
  first_name: string;
  email_address: string;
}

export default function SettingsScreen() {
  const {width, height} = useWindowDimensions();

  // toDo: get user's name from local storage instead or context
  const [userData, setUserData] = useState({
    first_name: 'user',
    last_name: '',
    email_address: '',
  });
  const user = useFetchUser();

  useEffect(() => {
    if (user) {
      const getName = async () => {
        const {data, error} = await supabase
          .from('users')
          .select('first_name, last_name, email_address')
          .eq('id', user?.id);

        if (!error) {
          if (data && data.length > 0) {
            const userData: userData = data[0];
            setUserData(userData);
            return;
          } else {
            console.log('No user found');
          }
        } else {
          console.log('Error ', error);
        }
      };

      getName();
    }
  }, [user]);

  return (
    <SafeAreaView
      style={[styles.container, {minHeight: height, minWidth: width}]}
    >
      <SettingsMainHeader />
      <View style={styles.userPreviewCont}>
        <View style={styles.profileSummary}>
          <UserAvatar />
          <View style={[styles.textContainer, {backgroundColor: 'white'}]}>
            <Text style={styles.fullName}>
              {userData.first_name + ' ' + userData.last_name}
            </Text>
            <Text style={styles.email}>{userData.email_address}</Text>
          </View>
        </View>
        <View style={styles.stripContainer}>
          <SettingsMainStripCard
            cardStyles={[styles.topStrip, styles.strips]}
            toLocation={'/profile/profile_info'}
            iconSrc={require('../../../assets/images/User/profile-icon.png')}
            text={'Profile'}
          />
          <SettingsMainStripCard
            cardStyles={styles.middleStrip}
            toLocation={'/profile'}
            iconSrc={require('../../../assets/images/User/notifications-icon.png')}
            text={'Notifications'}
          />
          <SettingsMainStripCard
            cardStyles={styles.middleStrip}
            toLocation={'/profile'}
            iconSrc={require('../../../assets/images/User/payments-icon.png')}
            text={'Payments and Linked Accounts'}
          />
          <SettingsMainStripCard
            cardStyles={styles.middleStrip}
            toLocation={'/profile'}
            iconSrc={require('../../../assets/images/User/faq-icon.png')}
            text={'Help and Support'}
          />
          <SettingsMainStripCard
            cardStyles={styles.bottomStrip}
            toLocation={'/'}
            iconSrc={require('../../../assets/images/User/log-out-icon.png')}
            text={'Log out'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  userPreviewCont: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 45,
    alignItems: 'center',
  },
  profileSummary: {justifyContent: 'center', alignItems: 'center', gap: 6},
  textContainer: {
    display: 'flex',
    backgroundColor: '#F9F9F9',
  },
  fullName: {
    fontWeight: '800',
    fontSize: 20,
    color: '#000000',
    backgroundColor: '#F9F9F9',
  },
  email: {
    fontStyle: 'italic',
    color: '#414751',
    backgroundColor: '#F9F9F9',
  },
  stripContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  strips: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
  },
  topStrip: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middleStrip: {
    borderTopLeftRadius: 0,
  },
  bottomStrip: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 0,
  },
});
