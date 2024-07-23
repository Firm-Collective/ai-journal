import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import AuthHeader from './AuthHeader';
import { supabase } from '@/lib/supabase';
import useFetchUser from '@/lib/hooks/useFetchUser';

const { width: window_width, height: window_height } = Dimensions.get('window');

const countries = [
  { label: 'Canada', value: 'CA' },
  { label: 'United State', value: 'USA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Russia', value: 'RU' },
  { label: 'Spain', value: 'spain' },
  { label: 'Italy', value: 'italy' },
  { label: 'Prefer not to say', value: 'N/A' },
];

export default function TellUsAboutYourselfScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const user = useFetchUser();

  const isFormValid = firstName !== '' && lastName !== '';

  const handleContinue = async () => {
    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }
    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          birth_year: birthYear,
          country: country,
          city: city,
          is_onboarding: true,
        })
        .eq('id', (user as any).id);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'User info added successfully');
    } catch (error) {
      console.error('Continue Error:', error);
      Alert.alert('Error', 'Failed to insert detail user data');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={styles.view}>
      <AuthHeader />
      <View style={styles.container}>
        <Text style={styles.textCreate}>Tell us about yourself</Text>
        <Text style={styles.subHeader}>
          <Text style={styles.required}>*</Text> indicates required
        </Text>
        <View>
          <TextInput
            style={[styles.textInput, firstName ? styles.filledInput : null]}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
          />
          <TextInput
            style={[styles.textInput, lastName ? styles.filledInput : null]}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
          />
          <DropDownPicker
            open={open}
            value={country}
            items={countries}
            setOpen={setOpen}
            setValue={setCountry}
            setItems={() => {}}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setCity}
            value={city}
            placeholder="City"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setBirthYear}
            value={birthYear}
            placeholder="Birth Year"
          />
          <Text style={[styles.textSmall, styles.textGrey]}>
            Password must be at least 8 characters and contain a letter and a
            number.
          </Text>
          <View style={styles.containerCheckbox}>
            <CheckBox
              checked={isChecked}
              onPress={handleCheckboxChange}
              containerStyle={{ marginRight: 0, paddingRight: 5 }}
            />
            <Text style={[styles.textSmall, styles.inlineText]}>
              <Text style={styles.textGrey}>
                Enable notifications to stay updated with the latest news and
                updates
              </Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={!isFormValid}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    minWidth: window_width,
    minHeight: window_height,
  },
  container: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  textCreate: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  required: {
    color: 'red',
  },
  textInput: {
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    fontFamily: 'Poppins',
  },
  filledInput: {
    borderColor: '#A9A9A9',
  },
  textSmall: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  textGrey: {
    color: '#6C757D',
  },
  inlineText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 13,
  },
  containerCheckbox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});
