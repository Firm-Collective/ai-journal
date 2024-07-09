import * as WebBrowser from 'expo-web-browser';
import {Platform} from 'react-native';
import * as Linking from 'expo-linking';

export default async function openAuthLink(link: string) {
  console.log('Link in open func ', link);

  const platformAppLink =
    Platform.OS === 'android' ? 'com.firmcollective.OneVoiceEcho' : 'none';

  try {
    const result = await WebBrowser.openAuthSessionAsync(link, platformAppLink);

    console.log('Auth state is ', result.type);
    console.log('Auth Session Result:', result);

    const loginUrl = Linking.createURL('/login');

    console.log('Url is ', loginUrl);

    if (result.type === 'success') {
      const loginUrl = Linking.createURL('/login');
      if (await Linking.canOpenURL(loginUrl)) await Linking.openURL(loginUrl);
      else console.log('We cannot open that lol');
    }

    return result;
  } catch (error) {
    console.error('Error opening auth link:', error);
    throw error;
  }
}
