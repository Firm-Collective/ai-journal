import {Alert} from 'react-native';
import {supabase} from './supabase';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

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

export async function signInWithFacebook() {
  try {
    // Attempt a login using the Facebook login dialog asking for default permissions.

    const results = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (results.isCancelled) {
      console.log('Login canceled');
    } else {
      const userData = await AccessToken.getCurrentAccessToken();
      console.log('Access token ', userData?.accessToken.toString());
      console.log('Data ', userData);
      console.log(
        'Login success with permissions: ' +
          results.grantedPermissions?.toString()
      );

      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          access_token: userData?.accessToken,
        },
      });

      if (error) {
        console.log('Supabase login error:', error);
      } else {
        console.log('Supabase login data:', data);
      }

      if (error) {
        console.log('Error getting user:', error);
      } else {
        console.log('User data:', userData);
      }
    }

    // TODO: if error then return error code
    Alert.alert('Success signing in user');
  } catch (e) {
    Alert.alert('Error signing in with user');
    console.log('An error occurred ', e);
  }
}

export async function signOutFacebook() {
  LoginManager.logOut();
}

export async function signOut() {
  const {error} = await supabase.auth.signOut();
  if (error) {
    Alert.alert('Error logging out user', error.message);
  } else {
    Alert.alert('Success logging out user');
    console.log('Success logging out');
  }
}

export async function getUser() {
  const {
    data: {user},
  } = await supabase.auth.getUser();
  return user;
}
