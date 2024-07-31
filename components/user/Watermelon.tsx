import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {syncWithServer} from '@/lib/watermelon/sync';
import {Button} from '@rneui/themed';
import {useAuth} from '@/providers/AuthProvider';
import {logAllPosts} from '@/lib/watermelon/databaseUtils';

const WatermelonScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const {session, loading} = useAuth();

  const syncNow = async () => {
    await syncWithServer(database);
  };

  const handleSubmit = async () => {
    try {
      const newPost = await Post.createPost(database, {
        title,
        text,
        user: session?.user.id || 'unknown_user',
      });

      // reset input values
      setTitle('');
      setText('');

      console.log('New post created', newPost);
    } catch (error) {
      console.error('Error creating post:', error);
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
      <Button title="Sync Now" onPress={syncNow} />
      <Button
        title="See all Posts in Database"
        onPress={() => {
          logAllPosts(database);
        }}
      />
      <Button
        title="Delete ID Post"
        onPress={() => {
          Post.deletePost(database, 'fu5ginbcH5F7GZpA');
        }}
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

export default WatermelonScreen;
