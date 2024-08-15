import React, {useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, TextInputSemiBold} from '@/components/StyledText';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {useLocalSearchParams, useFocusEffect} from 'expo-router';
import {useRouter} from 'expo-router';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const local = useLocalSearchParams();
  const postId = typeof local.id === 'string' ? local.id : undefined;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  const router = useRouter();
  // FIXME: Refactor this later
  useFocusEffect(
    useCallback(() => {
      const fetchPost = async () => {
        if (postId) {
          try {
            const fetchedPost = await Post.getPostById(database, postId);
            setPost(fetchedPost);
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
    }, [postId])
  );

  const handleSubmit = async () => {
    try {
      if (!postId) {
        throw new Error('Post ID is required.');
      }

      if (!post) {
        throw new Error('Post data is missing.');
      }

      // Update the post
      const updatedPost = await Post.updatePost(database, postId, {
        title: title, // Use title from state
        text: text, // Use text from state
      });

      console.log('Post updated:', updatedPost);

      // Reset input values
      setTitle('');
      setText('');

      // re-route to home page after successful edit
      router.push('/');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Display loading, error, or the post content
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textInputContainer}>
        <TextInputSemiBold
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
  textInputContainer: {
    flex: 1,
    padding: 5,
  },
  titleInput: {
    fontSize: 24,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'top',
  },
});

export default TextEntryScreen;
