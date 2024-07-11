import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import useFetchUser from '@/lib/hooks/useFetchUser';

const TextEntryScreen = () => {
  const [text, setText] = useState<string>('');
  const user = useFetchUser();

  const handleSubmit = async () => {
    if (!user) {
        Alert.alert('Error', 'User not found');
        return;
      }
    try {
      const { error } = await supabase.from('journal_entry').insert([
        {
            Text: text,
            id: (user as any)?.id,
        },
      ]);
      if (error) {
        throw error;
      }
      setText('');
      Alert.alert('Success', 'Entry submitted successfully');
    } catch (error) {
      console.error('Error submitting entry:', error);
      Alert.alert('Error', 'Failed to submit entry');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your text:</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type here..."
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
});

export default TextEntryScreen;
