import {useAuth} from '@/providers/AuthProvider';
import {Redirect, Stack} from 'expo-router';

export default function AuthLayout() {
  const {session} = useAuth();

  // if user is logged in, redirect to home screen
  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Stack></Stack>;
}
