import * as WebBrowser from 'expo-web-browser';
import {Platform} from 'react-native';
import * as Linking from 'expo-linking';

export default async function openAuthLink(link: string) {
  console.log('Link in open func ', link);

  // toDO: ios redirection
  const platformAppLink =
    Platform.OS === 'android' ? 'com.firmcollective.OneVoiceEcho' : 'none';

  try {
    const result = await WebBrowser.openAuthSessionAsync(link, platformAppLink);

    console.log('Auth state is ', result.type);
    console.log('Auth Session Result:', result);

    // toDo: ask David about preferred implementation -- manual redirection(below) or auto
    //  redirection with Supabase callback. Manual may fail if result.type implementation
    //  changes upstream(i.e if Supabase redirectTo fails then type will not be success as
    //  shown below. I suggest the former
    if (result.type === 'success') {
      // toDo: the redirection below may not work with ios -- case of supabase auth not
      //  redirecting. The code below redirects to home
      const loginUrl = Linking.createURL('/');
      if (await Linking.canOpenURL(loginUrl)) await Linking.openURL(loginUrl);
      else console.log('We cannot open that lol');
    }

    return result;
  } catch (error) {
    console.error('Error opening auth link:', error);
    throw error;
  }
}
