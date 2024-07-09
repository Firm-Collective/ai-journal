// import {StyleSheet} from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import {Text, View} from '@/components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View
//         style={styles.separator}
//         lightColor="#eee"
//         darkColor="rgba(255,255,255,0.1)"
//       />
//       <EditScreenInfo path="app/(tabs)/two.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {supabase} from '/Users/jbeaudry/Desktop/Develop For Good/ai-journal/lib/supabase'; // Adjust the import path based on your project structure

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handlePasswordReset = async () => {
    if (newPassword !== repeatNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const {data, error} = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Password updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'not successful');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.label}>Repeat New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={repeatNewPassword}
        onChangeText={setRepeatNewPassword}
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default PasswordReset;