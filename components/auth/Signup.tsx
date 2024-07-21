import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {signInWithApple, signInWithFacebook} from '@/lib/Auth';
import {useRoute} from '@react-navigation/native';
import GoogleSignInButton from '../auth/buttons/GoogleSigninButton';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const routeNow = useRoute();

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={(text: any) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={(text: any) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => ''} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => ''} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign in with facebook"
          disabled={loading}
          onPress={() => {
            return signInWithFacebook(routeNow.name);
          }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign in with apple"
          disabled={loading}
          onPress={signInWithApple}
        />
      </View>
      <GoogleSignInButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
