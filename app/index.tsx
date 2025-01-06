import WelcomeScreen from '@/components/WelcomeScreen';
import {useAuth} from '@/providers/AuthProvider';
import {Redirect} from 'expo-router';
import {ActivityIndicator} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Home from './(home)';

export default function IndexPage() {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    // show welcome screen if user needs to log-in
    return <WelcomeScreen />;
  }

  // return <Redirect href={'/home'} />;
  return <Home />;
}
