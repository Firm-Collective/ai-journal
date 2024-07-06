import {Alert} from 'react-native';
import {supabase} from './supabase';

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
