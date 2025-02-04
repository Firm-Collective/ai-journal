import {Redirect, Stack} from 'expo-router';

import {useAuth} from '@/providers/AuthProvider';
import {JournalEntriesProvider} from '@/providers/JournalEntriesProvider';

export default function TabLayout() {
  const {session} = useAuth();

  // if user is not logged in, redirect to login page
  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <JournalEntriesProvider>
      <Stack>
        <Stack.Screen name="home/index" options={{headerShown: false}} />
        <Stack.Screen name="text-entry" options={{headerShown: false}} />
        <Stack.Screen name="edit/[id]" options={{headerShown: false}} />
        <Stack.Screen name="settings" options={{headerShown: false}} />
        <Stack.Screen name="profile" options={{headerShown: false}} />
      </Stack>
    </JournalEntriesProvider>
  );
}
