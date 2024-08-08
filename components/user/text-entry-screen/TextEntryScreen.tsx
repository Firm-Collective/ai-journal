import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'expo-router';
import {Feather, MaterialIcons} from '@expo/vector-icons';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(16);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderlined, setIsUnderlined] = useState<boolean>(false);
  const [highlight, setHighlight] = useState<string>('');
  const {session} = useAuth();
  const router = useRouter();

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

      // re-route to home page after successful post creation
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);
  const toggleUnderline = () => setIsUnderlined(!isUnderlined);
  const toggleHighlight = () => setHighlight(highlight ? '' : 'yellow');

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.formattingBar}>
        <TouchableOpacity onPress={toggleBold}>
          <Feather name="bold" size={24} color={isBold ? 'black' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleItalic}>
          <Feather
            name="italic"
            size={24}
            color={isItalic ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleUnderline}>
          <Feather
            name="underline"
            size={24}
            color={isUnderlined ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleHighlight}>
          <MaterialIcons
            name="highlight"
            size={24}
            color={highlight ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(fontSize + 1)}>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(fontSize - 1)}>
          <Feather name="minus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[
          styles.textInput,
          {
            fontSize,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecorationLine: isUnderlined ? 'underline' : 'none',
            backgroundColor: highlight,
          },
        ]}
        value={text}
        onChangeText={setText}
        placeholder="What is God speaking to you?"
        placeholderTextColor="#696969"
        multiline
      />
    </ScrollView>
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
  formattingBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
});

export default TextEntryScreen;
