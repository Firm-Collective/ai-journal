import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {Redirect, Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';
import {useAuth} from '@/providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}
function TabBarIcon2(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={26} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {session} = useAuth();

  // if use is not logged in, redirect to login page
  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="text-entry"
        options={{
          title: 'Text Entry',
          tabBarIcon: ({color}) => <TabBarIcon2 name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon2 name="tasks" color={color} />,
        }}
      />
    </Tabs>
  );
}
