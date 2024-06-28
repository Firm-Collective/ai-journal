import {Stack} from 'expo-router';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {signOut} from '@/lib/Auth';
import useFetchUser from '@/lib/hooks/useFetchUser';

export default function SettingsPage() {
  const user = useFetchUser();
  const email = (user as {email: string})?.email;

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{headerShown: true, title: 'Settings'}} />
        <View style={{padding: 16}}>
          <Text>Email: {email}</Text>
          <TouchableOpacity onPress={signOut} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    overflow: 'scroll',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#000968',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  textInput: {
    borderColor: '#000968',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    margin: 8,
  },
});
