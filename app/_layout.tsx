import FontAwesome from '@expo/vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import AuthProvider from '@/providers/AuthProvider';
<<<<<<< HEAD

=======
import {useColorScheme} from '@/components/useColorScheme';
<<<<<<< HEAD
>>>>>>> a6cd5aa (partial 3rd party login solution. Currently supports Fb on Android and Apple auth on ios)
import {Linking} from 'react-native';
import parseAuthURLString from '@/lib/deepLinkHelper';
import {supabase} from '@/lib/supabase';
=======
import * as Linking from 'expo-linking';
import {createSessionFromUrl} from '@/lib/Auth';
>>>>>>> d49b099 (changed oauth implementation)

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
<<<<<<< HEAD
  const router = useRouter();
=======
  const colorScheme = useColorScheme();
>>>>>>> bb64f6f (changed oauth implementation)

  // this monitors for incoming urls and sets the session if it's an auth url
  const url = Linking.useURL();
  if (url) {
    console.log('Url is ', url);
    createSessionFromUrl(url);
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <SafeAreaProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen name="(user)" options={{headerShown: false}} />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
