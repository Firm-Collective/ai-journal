import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, TextInput, TextInputSemiBold} from '@/components/StyledText';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {Calendar} from 'react-native-calendars';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const {session} = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await Post.createPost(database, {
        title,
        text,
        user: session?.user.id || 'unknown_user',
        date: selectedDate.toISOString(), 
      });

      setTitle('');
      setText('');
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.navigate('/')}>
          <Icon name="arrow-back" size={24} color="purple" />
        </TouchableOpacity>

        {/* Date Picker Button */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Image
            source={require('../../../assets/images/home-screen/Calendar.png')}
          />
          <Text>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Popup */}
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day: {dateString: string}) => {
              setSelectedDate(new Date(day.dateString));
              setShowCalendar(false); // Hide after selection
            }}
            markedDates={{
              [selectedDate.toISOString().split('T')[0]]: {
                selected: true,
                selectedColor: 'purple',
              },
            }}
          />
        </View>
      )}

      {/* Text Input Fields */}
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
    </SafeAreaView>
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
    padding: 4,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  textInputContainer: {
    flex: 1,
    padding: 5,
  },
  saveText: {
    fontSize: 16,
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
