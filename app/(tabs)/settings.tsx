import {Button} from 'react-native';

import {View} from '@/components/Themed';
import {signOut} from '@/lib/Auth';

export default function TabOneScreen() {
  return (
    <View>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}
