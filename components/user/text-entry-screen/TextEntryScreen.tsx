import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text, TextInput, TextInputSemiBold} from '@/components/StyledText';
import {Post} from '@/lib/watermelon/post';
import {database} from '@/lib/watermelon/database';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {padding} from 'aes-js';
import {Popup, PopupRef} from '../home-screen/Popup';

const TextEntryScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const {session} = useAuth();
  const router = useRouter();
  const {height: SCREEN_HEIGHT} = Dimensions.get('window');
  const SCROLL_DESTINATION = -(SCREEN_HEIGHT / 8);

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

  const popupRef = useRef<PopupRef>(null);
  const openPopupMenu = () => {
    if (popupRef.current) {
      popupRef.current.scrollTo(SCROLL_DESTINATION);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
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
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(142, 87, 192, 1)',
              width: 40,
              height: 40,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => openPopupMenu()}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Popup menu to for more actions */}
      <Popup ref={popupRef}>
        <View style={styles.buttons_container}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Add</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              gap: 10,
            }}
          >
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View
                style={{
                  borderColor: 'rgba(17, 119, 199, 1)',
                  backgroundColor: 'rgba(233, 245, 255, 1)',
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 68,
                  height: 68,
                  padding: 10,
                }}
              />
              <Text>Prompt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View
                style={{
                  borderColor: 'rgba(142, 87, 192, 1)',
                  backgroundColor: 'rgba(248, 240, 255, 1)',
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 68,
                  height: 68,
                  padding: 10,
                }}
              />
              <Text>Scripture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View
                style={{
                  borderColor: 'rgba(216, 59, 59, 1)',
                  backgroundColor: 'rgba(255, 235, 235, 1)',
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 68,
                  height: 68,
                  padding: 10,
                }}
              />
              <Text>Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View
                style={{
                  borderColor: 'rgba(209, 73, 0, 1)',
                  backgroundColor: 'rgba(255, 240, 231, 1)',
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 68,
                  height: 68,
                  padding: 10,
                }}
              />
              <Text>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View
                style={{
                  borderColor: 'rgba(163, 89, 15, 1)',
                  backgroundColor: 'rgba(255, 249, 243, 1)',
                  borderWidth: 1,
                  borderRadius: 20,
                  width: 68,
                  height: 68,
                  padding: 10,
                }}
              />
              <Text>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Popup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
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
  buttons_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    gap: 10,
  },
  button_border: {
    borderBottomWidth: 1.5,
    borderBlockColor: '#ECEAEA',
  },
});

export default TextEntryScreen;
