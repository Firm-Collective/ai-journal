import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, TextInputSemiBold} from '@/components/StyledText';
import {TouchableOpacity} from 'react-native';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'expo-router';
import TagSelectionModal from './TagSelectionModal';
import PrivacySelectionModal from './PrivacySelectionModal';
import {TagOption, PrivacyOption} from './types';

/**
 * Journal entry creation screen that allows users to:
 * - Write journal entries
 * - Add multiple tags
 * - Set privacy settings
 */

const TextEntryScreen = () => {
  // State management for form inputs and modals
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [selectedPrivacy, setSelectedPrivacy] = useState<PrivacyOption | null>(null);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const {session} = useAuth();
  const router = useRouter();

  /**
   * Handles tag selection/deselection
   * @param tag - The tag to toggle
   */
  const handleSaveButtonClick = (event: any) => {
    event.preventDefault();
    setIsTagModalVisible(true);
  };

  const handleTagSelect = (tag: TagOption) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleTagNext = () => {
    setIsTagModalVisible(false);
    setIsPrivacyModalVisible(true);
  };

  /**
   * Handles final submission of the journal entry
   * Validates input, saves to database, and handles errors
   */
  const handleSubmit = async () => {
    try {
      await Post.createPost(database, {
        title,
        text,
        user: session?.user.id || 'unknown_user',
      });

      // reset input values
      setTitle('');
      setText('');
      setSelectedTags([]);
      setSelectedPrivacy(null);
      setIsPrivacyModalVisible(false);

      // re-route to home page after successful post creation
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSaveButtonClick}>
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

      <TagSelectionModal
        visible={isTagModalVisible}
        selectedTags={selectedTags}
        onSelectTag={handleTagSelect}
        onNext={handleTagNext}
        onClose={() => setIsTagModalVisible(false)}
      />

      <PrivacySelectionModal
        visible={isPrivacyModalVisible}
        selectedPrivacy={selectedPrivacy}
        onSelectPrivacy={setSelectedPrivacy}
        onSubmit={handleSubmit}
        onClose={() => setIsPrivacyModalVisible(false)}
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
  textInputContainer: {
    flex: 1,
    padding: 5,
  },
  saveText: {
    fontSize: 18,
    color: 'purple',
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