import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../StyledText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CheckBox} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import AuthHeader from './AuthHeader';
import {supabase} from '@/lib/supabase';
import useFetchUser from '@/lib/hooks/useFetchUser';
import {router} from 'expo-router';
import countriesData from '@/assets/countries.json';

const {width: window_width, height: window_height} = Dimensions.get('window');

interface Country {
  label: string;
  value: string;
}

export default function TellUsAboutYourselfScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const user = useFetchUser();

  useEffect(() => {
    // Format data from countries.json
    const formattedCountryData = countriesData.map(country => ({
      label: country.name,
      value: country.code,
    }));
    setCountries(formattedCountryData);
  }, []);

  const isFormValid = firstName !== '' && lastName !== '';

  const handleContinue = async () => {
    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }
    try {
      const {error: metadataError} = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          birth_year: birthYear,
          country: country,
          city: city,
          is_onboarding: false,
        },
      });

      if (metadataError) {
        throw metadataError;
      }

      const {error: tableError} = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          birth_year: birthYear,
          is_onboarding: false,
        })
        .eq('id', (user as any).id);

      if (tableError) {
        throw tableError;
      }

      Alert.alert('Success', 'User info added successfully');
      router.push('/');
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
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subHeader}>
          <Text style={styles.required}>*</Text> indicates required
        </Text>
        <View>
          <TextInput
            style={[styles.textInput, firstName ? styles.filledInput : null]}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name *"
            placeholderTextColor="#32363E"
          />
          <TextInput
            style={[styles.textInput, lastName ? styles.filledInput : null]}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name *"
            placeholderTextColor="#32363E"
          />
          <DropDownPicker
            style={[styles.textInput, country ? styles.filledInput : null]}
            open={open}
            value={country}
            items={countries}
            setOpen={setOpen}
            setValue={setCountry}
            setItems={() => {}}
            placeholder="Country"
            placeholderStyle={styles.placeholder}
            searchable={true}
            searchPlaceholder="Search your country"
          />
          <TextInput
            style={[styles.textInput, city ? styles.filledInput : null]}
            onChangeText={setCity}
            value={city}
            placeholder="City"
            placeholderTextColor="#32363E"
          />
          <TextInput
            style={[styles.textInput, birthYear ? styles.filledInput : null]}
            onChangeText={setBirthYear}
            value={birthYear}
            placeholder="Birth Year"
            placeholderTextColor="#32363E"
          />
          <View style={styles.containerCheckbox}>
            <CheckBox
              checked={isChecked}
              onPress={handleCheckboxChange}
              containerStyle={{marginRight: 0, paddingRight: 5}}
            />
            <Text style={[styles.textSmall, styles.inlineText]}>
              <Text style={styles.textGrey}>
                Enable notifications to stay updated with the latest news and
                updates
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.disabledButton]}
            onPress={handleContinue}
          >
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
    paddingHorizontal: 30,
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'right',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 10,
  },
  required: {
    color: 'red',
  },
  textInput: {
    height: 48,
    borderColor: '#A3ABB7',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    fontFamily: 'Poppins',
  },
  filledInput: {
    borderColor: '#EDEDED',
    backgroundColor: '#FCFCFC',
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
  placeholder: {
    color: '#32363E',
  },
  containerCheckbox: {
    left: -20,
    flexDirection: 'row',
    width: '88%',
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
  disabledButton: {
    backgroundColor: 'gray',
  },
});
