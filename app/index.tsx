import {useAuth} from '@/providers/AuthProvider';
import {Redirect} from 'expo-router';
import {ActivityIndicator} from 'react-native';

export default function IndexPage() {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/(auth)/login'} />;
  }

  return <Redirect href={'/(user)/home'} />;
}
