import FontAwesome from '@expo/vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthProvider from '@/providers/AuthProvider';
import NetworkProvider from '@/providers/NetworkProvider';
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
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = (event: {url: string}) => {
      const url = new URL(event.url);
      const path = url.pathname.slice(1);

      if (path === 'login') {
        router.push('/login');
      }
    };

    // Handle incoming url
    Linking.getInitialURL().then(url => {
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
    <ThemeProvider value={DefaultTheme}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <SafeAreaProvider>
        <NetworkProvider>
          <AuthProvider>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="(auth)" options={{headerShown: false}} />
                <Stack.Screen name="(user)" options={{headerShown: false}} />
              </Stack>
            </GestureHandlerRootView>
          </AuthProvider>
        </NetworkProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
