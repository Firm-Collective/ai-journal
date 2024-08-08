import WelcomeScreen2 from '@/components/WelcomeScreen2';
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
    return <WelcomeScreen2 />;
  }

  return <Redirect href={'/home'} />;
}
