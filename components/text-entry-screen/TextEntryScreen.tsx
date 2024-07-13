import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import useFetchUser from '@/lib/hooks/useFetchUser';
import { TouchableOpacity } from 'react-native';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const user = useFetchUser();

  const handleSubmit = async () => {
    // if (!user) {
    //     Alert.alert('Error', 'User not found');
    //     return;
    //   }
    try {
      const { error } = await supabase.from('journal_entry').insert([
        {
            Text: text,
            Owner: (user as any).id,
            created_at: date.toISOString(),
        },
      ]);
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
      />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="What is God speaking to you?"
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
    justifyContent: 'space-between',
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
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    textAlignVertical: 'top',
  }
});

export default TextEntryScreen;
