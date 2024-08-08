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
import SettingsMainStripCard from '@/components/user/settings/SettingsMainStripCard';
import {useAuth} from '@/providers/AuthProvider';
import {useEffect, useState} from 'react';

export default function SettingsScreen() {
  const {width, height} = useWindowDimensions();
  const {session: userData} = useAuth();

  const [fullName, setFullName] = useState('Account Name');
  const [email, setEmail] = useState('please set your email');

  useEffect(() => {
    if (userData) {
      const {first_name, last_name} = userData.user.user_metadata;
      const {email: userEmail} = userData.user;
      if (first_name !== undefined) {
        setFullName(`${first_name} ${last_name}`);
      }
      setEmail(userEmail || 'please set your email');
    }
  }, [userData]);

  return (
    <SafeAreaView
      style={[styles.container, {minHeight: height, minWidth: width}]}
    >
      <SettingsMainHeader />
      <View style={styles.userPreviewCont}>
        <View style={styles.profileSummary}>
          <UserAvatar />
          <View style={[styles.textContainer, {backgroundColor: 'white'}]}>
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.email}>{email}</Text>
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
            toLocation={'/'}
            iconSrc={require('../../../assets/images/User/notifications-icon.png')}
            text={'Notifications'}
          />
          <SettingsMainStripCard
            cardStyles={styles.middleStrip}
            toLocation={'/'}
            iconSrc={require('../../../assets/images/User/payments-icon.png')}
            text={'Payments and Linked Accounts'}
          />
          <SettingsMainStripCard
            cardStyles={styles.middleStrip}
            toLocation={'/'}
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
