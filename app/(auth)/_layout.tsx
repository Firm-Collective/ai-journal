import {useAuth} from '@/providers/AuthProvider';
import {Redirect, Stack} from 'expo-router';

export default function AuthLayout() {
  // const {session} = useAuth();

  // // if user is logged in, redirect to home screen
  // if (session) {
  //   return <Redirect href={'/'} />;
  // }

  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown: false}} />
      <Stack.Screen name="signup" options={{headerShown: false}} />
      <Stack.Screen name="email-verification" options={{headerShown: false}} />
      <Stack.Screen name="tell-us-about-yourself" options={{headerShown: false}} />
    </Stack>
  );
}
