// toDo: implement PKCE flow
import {Alert, Platform} from 'react-native';
import {supabase} from './supabase';
import {makeRedirectUri} from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
// toDo: uncomment or revert file
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import {Provider, Session} from '@supabase/supabase-js';

/**
 * Signs up the user with an email and password
 * @param {string} email - the email to sign up with
 * @param {string} password - the password to signup with
 * @returns {object} - returns an object with success and message properties
 */
export async function signupWithEmail(email: string, password: string) {
  const {
    data: {session, user},
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      // toDo: change domain to firmcollective --- see developer(Lyton) notes
      emailRedirectTo: 'https://lyton.dev/login',
    },
  });

  // Check for errors during signup
  if (error) {
    if (error.message.includes('already registered')) {
      // Return specific message for existing account
      return {
        success: false,
        message: 'Account already exists, please log in instead.',
      };
    }
    // Return general error message
    return {success: false, message: error.message};
  } else if (session === null) {
    // if user identities array is 0, then email already exists
    if (user?.identities?.length === 0) {
      // Return specific message for existing account
      return {
        success: false,
        message: 'Account already exists, please log in instead.',
      };
    } else {
      // Return success message for new account requiring email confirmation
      return {
        success: true,
        message: 'Please check your email to confirm your account.',
      };
    }
  } else {
    // Return success message for immediate login
    return {success: true, message: 'You have been signed up and logged in.'};
  }
}

/**
 * Signs in the user with a valid email and password
 * @param {string} email - the email to sign in with
 * @param {string} password - the password to sign in with
 * @returns {object} - returns an object with success and message properties
 */
export async function loginWithEmail(email: string, password: string) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    // Return specific error message for incorrect email or password
    return {
      success: false,
      message: 'Incorrect email or password. Please try again.',
    };
  } else {
    // if success, return success message and data needed
    return {
      success: true,
      message: 'Success signing in with user',
      userId: data.user.id,
    };
  }
}

/**
 * Signs in the user with Facebook using the OAuth flow
 */
export async function signInWithFacebook() {
  await signInWithOAuthProvider('facebook');
}

/**
 * This function creates a supabase session from the provided url. It parses the required
 * parameters from the url and sets the session with those
 * @param url the url to parse
 */
export const createSessionFromUrl = async (
  url: string
): Promise<Session | null> => {
  const {params, errorCode} = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);

  const {access_token, refresh_token} = params;

  if (!access_token) {
    console.log('No acc token');
    // throw new Error('No access token');
  }

  const {data, error} = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    console.log('Supabase error occurred');
  }

  return data.session;
};

/**
 * Signs in a user with their necessary implementation
 */
export async function signInWithApple() {
  if (Platform.OS === 'ios') {
    await signInWithAppleNative();
  } else if (Platform.OS === 'android') {
    await signInWithAppleAndroid();
  }
}

/**
 * Signs in an iphone user using the native apple authentication system
 */
const signInWithAppleNative = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // Sign in via Supabase Auth.
    if (credential.identityToken) {
      const {
        error,
        data: {user},
      } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });
      console.log(JSON.stringify({error, user}, null, 2));
      if (!error) {
        // User is signed in.
        // toDo: handle user onboarding logic
        console.log('User signed in');
      }
    } else {
      console.log('No id token');
      throw new Error('No identityToken.');
    }
  } catch (e: any) {
    Alert.alert('An error occurred. Please try a different sign in method');
    if (e.code === 'ERR_REQUEST_CANCELED') {
      // handle that the user canceled the sign-in flow
      console.log('flow canceled');
    } else {
      // handle other errors
      console.log('Misc errors occurred');
    }
  }
};

/**
 * Signs in an android user using the apple provider
 */
const signInWithAppleAndroid = async () => {
  await signInWithOAuthProvider('apple');
};

export async function signInWithOAuthProvider(authProvider: Provider) {
  const redirectTo = makeRedirectUri();

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: authProvider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.log('Supabase Oauth error');
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? '',
    redirectTo
  );

  if (res.type === 'success') {
    console.log('Success res ', res);
    const {url} = res;
    await createSessionFromUrl(url);
  } else if (res.type === 'dismiss') {
    //   toDo: dismissBrowser function called
    console.log('Web auth browser dismissed');
  } else if (res.type === 'cancel') {
    //   toDo: handle cancelling -- user did not allow/give permission OR they closed browser
    console.log('Web auth browser: canceled');
  } else if (res.type === 'locked') {
    //   toDo: handle locked device
    console.log('Web auth browser: locked');
  }
}

/**
 * Signs in the user with Google
 */
// toDo: uncomment
//Todo: change oauth key to firmcollective's
// GoogleSignin.configure({
//   // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
//   webClientId:
//     '64478294171-estk2fbh8o55du2uidrt6l2h4s10vn8v.apps.googleusercontent.com',
//   // what API you want to access on behalf of the user, default is email and profile
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//   // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   iosClientId:
//     '64478294171-ehjcv2i43egrjdcggpm3n4c0a7l5jkk9.apps.googleusercontent.com',
// });

// toDo:uncomment
// export async function signInWithGoogle() {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     if (userInfo.idToken) {
//       const {data, error} = await supabase.auth.signInWithIdToken({
//         provider: 'google',
//         token: userInfo.idToken,
//       });
//       if (error) {
//         Alert.alert('Error signing in with Google', error.message);
//         return false;
//       } else {
//         Alert.alert('Success signing in with Google');
//         return true;
//       }
//     } else {
//       throw new Error('no ID token present!');
//     }
//   } catch (error: any) {
//     if (error.code) {
//       switch (error.code) {
//         case statusCodes.SIGN_IN_CANCELLED:
//           console.log('User cancelled the login flow');
//           break;
//         case statusCodes.IN_PROGRESS:
//           console.log('Operation (e.g. sign in) already in progress');
//           break;
//         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//           console.log('Play services not available or outdated');
//           break;
//         default:
//           console.log('Some other error happened', error);
//       }
//     } else {
//       console.log(
//         "An error that's not related to Google sign-in occurred",
//         error
//       );
//     }
//   }
//   return false;
// }

export async function signOut() {
  const {error} = await supabase.auth.signOut();
  if (error) {
    Alert.alert('Error logging out user', error.message);
  } else {
    Alert.alert('Success logging out user');
  }
}

export async function getUser() {
  const {
    data: {user},
  } = await supabase.auth.getUser();
  return user;
}
