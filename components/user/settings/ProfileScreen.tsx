import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import UserAvatar from '@/components/user/settings/UserAvatar';
import ProfileOverviewStripCard from '@/components/user/settings/ProfileOverviewStripCard';
import AccountInfoAccordion from '@/components/user/settings/AccountInfoAccordion';
import AccountInfoCardStrip from '@/components/user/settings/AccountInfoCardStrip';

export default function ProfileScreen() {
  const {height, width} = useWindowDimensions();
  return (
    <SafeAreaView
      style={[
        {
          minHeight: height,
          minWidth: width,
        },
        styles.container,
      ]}
    >
      <ScrollView contentContainerStyle={[styles.contentWrapper]}>
        <View style={styles.avatarContainer}>
          <UserAvatar />
          <Text>Edit picture</Text>
        </View>
        <View style={styles.mainProfileTopStrip}>
          <ProfileOverviewStripCard
            userProp={'Username'}
            propValue={'name_here'}
          />
          <ProfileOverviewStripCard
            userProp={'Location'}
            propValue={'City, USA'}
          />
        </View>

        <View>
          <Text style={styles.accountInfoText}>Account Info</Text>
          <View style={styles.accountInfoVisibility}>
            <Image
              source={require('../../../assets/images/User/lock-icon.png')}
              style={styles.accountInfoImage}
            />
            <Text>Only visible to you</Text>
          </View>
          <View>
            <AccountInfoAccordion
              userProperty={'Email'}
              userPropertyValue={'123@gmail.com'}
              externalStyles={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <AccountInfoAccordion
              userProperty={'Phone'}
              userPropertyValue={'+1 (234) 567-890 '}
              externalStyles={{borderBottomWidth: 1, borderTopWidth: 0}}
            />
            <AccountInfoCardStrip userProperty={'Password'} toLocation={'/'} />
          </View>
        </View>
        <View style={styles.bioInfoCont}>
          <Text style={styles.bioInfoText}>Bio Info</Text>
          <View>
            <AccountInfoAccordion
              userProperty={'Gender'}
              userPropertyValue={'Female'}
              externalStyles={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <AccountInfoAccordion
              userProperty={'Language'}
              userPropertyValue={'English'}
              externalStyles={{borderTopWidth: 0}}
            />
            <AccountInfoCardStrip
              userProperty={'About me'}
              toLocation={'/profile/about_me'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === 'android' ? 30 : 100,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainProfileTopStrip: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  accountInfoCont: {
    display: 'flex',
  },
  accountInfoText: {
    fontWeight: 'bold',
  },
  accountInfoVisibility: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountInfoImage: {
    resizeMode: 'contain',
    width: 20,
  },
  bioInfoCont: {
    display: 'flex',
    gap: 8,
  },
  bioInfoText: {
    fontWeight: 'bold',
  },
});