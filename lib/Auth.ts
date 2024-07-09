import {Alert, Platform} from 'react-native';
import {supabase} from './supabase';
import openAuthLink from '@/lib/webLinkOpen';
import {makeRedirectUri} from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

/**
 * Signs up the user with an email and password
 * @param {string} email - the email to sign up with
 * @param {string} password - the password to signup with
 *
 */
export async function signUpWithEmail(email: string, password: string) {
  const {
    data: {session},
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      // toDo: change domain to firmcollective --- see developer(Lyton) notes
      emailRedirectTo: 'https://lyton.dev/login',
    },
  });

  // TODO: If error then return error code
  if (error) {
    Alert.alert('Sign up error', error.message);
  } else {
    Alert.alert('Success signing up with email');
  }
}

/**
 * Signs in the user with a valid email and password
 * @param {string} email - the email to sign in with
 * @param {string} password - the password to sign in with
 */
export async function signInWithEmail(email: string, password: string) {
  const {error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  // TODO: if error then return error code
  if (error) {
    Alert.alert('Error signing in with user', error.message);
  } else {
    Alert.alert('Success signing in with user');
  }
}

/**
 * Signs in the user with Facebook
 */
export async function signInWithFacebook() {
  const redirectOnAuthLocation = makeRedirectUri();
  console.log('We will redirect to ', redirectOnAuthLocation);
  const {
    data: {url: supabaseFacebookUrl},
    error: supabaseError,
  } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: redirectOnAuthLocation,
    },
  });

  if (supabaseFacebookUrl) {
    const authResult = await openAuthLink(supabaseFacebookUrl);
    // If the user does not permit the application to authenticate with the given url, the Promise fulfills with { type: 'cancel' } object.
    // If the user closed the web browser, the Promise fulfills with { type: 'cancel' } object.
    // If the browser is closed using dismissBrowser, the Promise fulfills with { type: 'dismiss' } object.

    if (authResult.type === 'cancel') {
      //   toDo: handle cancel -- some sort of error
    } else if (authResult.type === 'dismiss') {
      //   toDo: handle dismiss -- also a case of success
    } else if (authResult.type === 'success') {
      //   toDo: handle success
    }
  } else if (supabaseError) console.log('An error occurred with supabase');
  else {
    //   toDo: handle case of other error
  }
}

export async function signInWithApple() {
  if (Platform.OS === 'ios') {
    await signInWithAppleNative();
  } else if (Platform.OS === 'android') {
    await signInWithAppleAndroid();
  }
}

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
  } catch (e) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      // handle that the user canceled the sign-in flow
      console.log('flow canceled');
    } else {
      // handle other errors
      console.log('Misc errors occurred');
    }
  }
};

const signInWithAppleAndroid = async () => {
  const redirectOnAuthLocation = makeRedirectUri();
  console.log('We will redirect to ', redirectOnAuthLocation);

  const {
    data: {url: supabaseAppleUrl},
    error: supabaseError,
  } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: redirectOnAuthLocation,
    },
  });

  if (supabaseAppleUrl) {
    const authResult = await openAuthLink(supabaseAppleUrl);
    // If the user does not permit the application to authenticate with the given url, the Promise fulfills with { type: 'cancel' } object.
    // If the user closed the web browser, the Promise fulfills with { type: 'cancel' } object.
    // If the browser is closed using dismissBrowser, the Promise fulfills with { type: 'dismiss' } object.

    if (authResult.type === 'cancel') {
      console.log('Browser event canceled');
      //   toDo: handle cancel -- some sort of error
    } else if (authResult.type === 'dismiss') {
      //   toDo: handle dismiss --
      console.log('Browser dismissed');
    } else if (authResult.type === 'success') {
      //   toDo: handle success
      console.log('Browser event success');
    }
  } else if (supabaseError) console.log('An error occurred with supabase');
  else {
    //   toDo: handle case of other error
  }
};

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
