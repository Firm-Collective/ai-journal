import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Signup from '@/components/auth/Signup';

export class Login extends Component {
  render() {
    return (
      <View>
        <Signup />
      </View>
    );
  }
}

export default Login;
