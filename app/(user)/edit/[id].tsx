import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {syncWithServer} from '@/lib/watermelon/sync';
import {useAuth} from '@/providers/AuthProvider';
import {useNet} from '@/providers/NetworkProvider';
import {useLocalSearchParams} from 'expo-router';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const {isConnected} = useNet();

  const local = useLocalSearchParams();
  const postId = typeof local.id === 'string' ? local.id : undefined;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchPost = async () => {
      if (postId) {
        try {
          const fetchedPost = await Post.getPostById(database, postId);
          setTitle(fetchedPost?.title || '');
          setText(fetchedPost?.text || '');
        } catch (error) {
          console.error('Error fetching post by ID:', error);
          setError('Failed to fetch post');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid post ID');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async () => {
    try {
      // TODO EDIT HERE

      // reset input values
      setTitle('');
      setText('');

      if (isConnected) {
        await syncWithServer(database);
      }
    } catch (error) {
      console.error('Error Updating post:', error);
    }
  };
  // Display loading, error, or the post content
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

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