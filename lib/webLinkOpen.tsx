import * as WebBrowser from 'expo-web-browser';
import {Platform} from 'react-native';

export default async function openAuthLink(link: string) {
  console.log('Link in open func ', link);

  const platformAppLink =
    Platform.OS === 'android' ? 'com.firmcollective.OneVoiceEcho' : 'none';

  try {
    const result = await WebBrowser.openAuthSessionAsync(link, platformAppLink);
    console.log('Auth state is ', result.type);
    console.log('Auth Session Result:', result);
    return result;
  } catch (error) {
    console.error('Error opening auth link:', error);
    throw error;
  }
}
