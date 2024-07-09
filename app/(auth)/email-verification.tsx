import {View} from 'react-native';
import Signup from '@/components/auth/Signup';
import EmailVerification from '@/components/auth/EmailVerification';

function Page() {
  return (
    <View>
      <EmailVerification />
    </View>
  );
}

export default Page;
