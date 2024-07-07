import {useAuth} from '@/providers/AuthProvider';
import {Redirect, Stack} from 'expo-router';

export default function AuthLayout() {
  const {session} = useAuth();

  // if user is logged in, redirect to home screen
  if (session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown: false}} />
      <Stack.Screen name="signup" options={{headerShown: false}} />
<<<<<<< HEAD
      <Stack.Screen name="email-verification" options={{headerShown: false}} />
=======
>>>>>>> fcf4495 (partial 3rd party login solution. Currently supports Fb on Android and Apple auth on ios)
    </Stack>
  );
}
