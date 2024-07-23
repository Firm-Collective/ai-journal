import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Redirect, Tabs} from 'expo-router';

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
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            tabBarIcon: ({color}) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="text-entry"
          options={{
            title: 'Text Entry',
            tabBarIcon: ({color}) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({color}) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </JournalEntriesProvider>
  );
}
