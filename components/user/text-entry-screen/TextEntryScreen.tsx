import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import {supabase} from '@/lib/supabase';
import useFetchUser from '@/lib/hooks/useFetchUser';
import {TouchableOpacity} from 'react-native';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const user = useFetchUser();

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }
    try {
      const {data, error} = await supabase
        .from('journal_entry')
        .insert([
          {
            Title: title,
            Text: text,
            Owner: (user as any).id,
          },
        ])
        .select('id');
      if (error) {
        throw error;
      }
      setText('');
      setTitle('');
      Alert.alert('Success', 'Entry submitted successfully');
    } catch (error) {
      console.error('Error submitting entry:', error);
      Alert.alert('Error', 'Failed to submit entry');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#696969"
      />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="What is God speaking to you?"
        placeholderTextColor="#696969"
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveText: {
    fontSize: 18,
    color: 'purple',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#272727',
    textAlignVertical: 'top',
  },
});

export default TextEntryScreen;
