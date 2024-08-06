import {Stack} from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{headerShown: false}} />
      <Stack.Screen name="profile_info" options={{headerShown: false}} />
      <Stack.Screen name="about_me" options={{headerShown: false}} />
      <Stack.Screen name="change_password" options={{headerShown: false}} />
    </Stack>
  );
}
