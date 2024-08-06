import WelcomeScreen from '@/components/WelcomeScreen';
import {useAuth} from '@/providers/AuthProvider';
import {Redirect} from 'expo-router';
import {ActivityIndicator} from 'react-native';

export default function IndexPage() {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    // show welcome screen if user needs to log-in
    console.log("HERE IS WHERE WE ARE 123");
    return <WelcomeScreen />;
  }

  return <Redirect href={'/(user)/home'} />;
}
