import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Redirect, Tabs, Stack} from 'expo-router';

import Colors from '@/constants/Colors';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {useAuth} from '@/providers/AuthProvider';
import {JournalEntriesProvider} from '@/providers/JournalEntriesProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const {session} = useAuth();

  // if use is not logged in, redirect to login page
  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <JournalEntriesProvider>
      <Stack>
        <Stack.Screen name="home/index" options={{headerShown: true}} />
        <Stack.Screen name="text-entry" options={{headerShown: true}} />
        <Stack.Screen name="edit/[id]" options={{headerShown: true}} />
        <Stack.Screen name="settings" options={{headerShown: true}} />
      </Stack>
    </JournalEntriesProvider>
  );
}
