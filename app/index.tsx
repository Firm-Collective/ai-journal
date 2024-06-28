import {View} from '@/components/Themed';
import {Text} from '@/components/Themed';
import {signOut} from '@/lib/Auth';
import {useAuth} from '@/providers/AuthProvider';
import {Link, Redirect} from 'expo-router';
import {ActivityIndicator, Button} from 'react-native';

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
