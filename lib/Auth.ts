import {Alert} from 'react-native';
import {supabase} from './supabase';

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

<<<<<<< HEAD
  // TODO: If error then return error code
  if (error) {
    Alert.alert('Sign up error', error.message);
    console.log('error', session, user);
    return false;
=======
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
>>>>>>> 0b8db46 (feat: finished all features and took exact messages from figma file)
  } else if (session === null) {
    // if user identities array is 0, then email already exists
    if (user?.identities?.length === 0) {
<<<<<<< HEAD
      Alert.alert('Sign up error', 'This email is already in use.');
      return false;
    } else {
      // if not, then it is a new account
      Alert.alert(
        'Success',
        'Please check your email to confirm your account.'
      );
      return true;
    }
  } else {
    Alert.alert('Success', 'You have been signed up and logged in.');
    return true;
=======
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
>>>>>>> 0b8db46 (feat: finished all features and took exact messages from figma file)
  }
}

/**
 * Signs in the user with a valid email and password
 * @param {string} email - the email to sign in with
 * @param {string} password - the password to sign in with
<<<<<<< HEAD
 * @return {bool} bool - returns false if the user isn't able to sign in, false otherwise
=======
 * @returns {object} - returns an object with success and message properties
>>>>>>> 0b8db46 (feat: finished all features and took exact messages from figma file)
 */
export async function loginWithEmail(email: string, password: string) {
  const {error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

<<<<<<< HEAD
  // TODO: if error then return error code
  if (error) {
    Alert.alert('Error signing in with user', error.message);
    return false;
  } else {
    Alert.alert('Success signing in with user');
    return true;
=======
  // Check for errors during login
  if (error) {
    // Return specific error message for incorrect email or password
    return {
      success: false,
      message: 'Incorrect email or password. Please try again.',
    };
  } else {
    // Return success message for successful login
    return {success: true, message: 'Success signing in with user'};
>>>>>>> 0b8db46 (feat: finished all features and took exact messages from figma file)
  }
}

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
