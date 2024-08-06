import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import AuthProvider from '@/providers/AuthProvider';

import {useColorScheme} from '@/components/useColorScheme';
import {Linking} from 'react-native';
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
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    // console.log('GOT HERE 123');
    const handleDeepLink = (event: {url: string}) => {
      console.log("GOT HERE");
      console.log('Deep link received:', event.url);
      const url = new URL(event.url);
      const path = url.pathname.slice(1);
      // const path2 = url.pathname.slice()

      console.log('Parsed path:', path); // Log parsed path
      
      if (path === '--/reset-pass') {
        console.log("CALLED HERE");
        const queryParams = new URLSearchParams(url.search);
        const accessToken = queryParams.get('access_token');
        const refreshToken = queryParams.get('refresh_token');
        console.log("access");
        console.log(accessToken);
        console.log("refresh");
        console.log(refreshToken);
        router.push('/(auth)/reset-pass?access_token=' + encodeURIComponent(accessToken) + "&refresh_token=" + encodeURIComponent(refreshToken));
      } else if (path === 'login') {
        router.push('/login');
      }
    };

    // Handle incoming url
    Linking.getInitialURL().then(url => {
      console.log("Called Here: " + url);
      if (url) {
        handleDeepLink({url});
      }
    });

    // Listen for new urls
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="(auth)" options={{headerShown: false}} />
          <Stack.Screen name="(user)" options={{headerShown: false}} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
