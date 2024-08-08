import FontAwesome from '@expo/vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import AuthProvider from '@/providers/AuthProvider';
import NetworkProvider from '@/providers/NetworkProvider';
import * as Linking from 'expo-linking';
import {createSessionFromUrl} from '@/lib/Auth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {supabase} from '@/lib/supabase';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // this monitors for incoming urls and sets the session if it's an auth url
  const url = Linking.useURL();
  if (url) {
    if (url.includes('access_token')) {
      createSessionFromUrl(url);
    }
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="index" options={{headerShown: false}} />
              <Stack.Screen name="(auth)" options={{headerShown: false}} />
              <Stack.Screen name="(user)" options={{headerShown: false}} />
            </Stack>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
