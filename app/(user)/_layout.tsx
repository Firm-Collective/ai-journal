import {Redirect, Stack} from 'expo-router';
import {useAuth} from '@/providers/AuthProvider';
import {JournalEntriesProvider} from '@/providers/JournalEntriesProvider';
import SearchScreen from '@/components/user/search-screen/SearchScreen';
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
        <Stack.Screen name="text-entry" options={{headerShown: true}} />
        <Stack.Screen name="edit/[id]" options={{headerShown: true}} />
        <Stack.Screen name="settings" options={{headerShown: true}} />
        <Stack.Screen name="profile" options={{headerShown: true}} />
        <Stack.Screen name="search/index" />
        </Stack>
    </JournalEntriesProvider>
  );
}
