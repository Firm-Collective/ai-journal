import React, {useState, useRef, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Pressable,
} from 'react-native';
import {Card} from '@rneui/themed';
import {MonoText, TextSemiBold} from '@/components/StyledText';
import Tag from './Tag';
import {IJournalEntry} from '@/models/data/IJournalEntry';
import {dateToStringConverter} from '@/lib/util';

const CONTENT_LENGTH = 200;

export default function Post({
  id,
  date,
  title,
  imagePath,
  content,
  tags,
  onDelete,
  onEdit,
}: IJournalEntry & {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  const toggleMenu = useCallback(() => {
    setMenuVisible(prev => !prev);
    Animated.timing(dropdownOpacity, {
      toValue: menuVisible ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, dropdownOpacity]);

  const closeMenu = useCallback(() => {
    if (menuVisible) {
      toggleMenu();
    }
  }, [menuVisible, toggleMenu]);

  const handlePressOutside = useCallback(
    event => {
      if (menuVisible) {
        closeMenu();
      }

      // TODO: view the post that was created
    },
    [menuVisible, closeMenu]
  );

  return (
    <Pressable onPress={handlePressOutside}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardTop}>
          <MonoText style={styles.date}>{dateToStringConverter(date)}</MonoText>
          <View>
            <TouchableOpacity onPress={toggleMenu}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/home-screen/more-icon.png')}
              />
            </TouchableOpacity>
            {menuVisible && (
              <Pressable style={[styles.dropdown]}>
                <Animated.View style={[{opacity: dropdownOpacity}]}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      closeMenu();
                      onEdit(id);
                    }}
                  >
                    <Text style={styles.dropdownText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      closeMenu();
                      onDelete(id);
                    }}
                  >
                    <Text style={styles.dropdownText}>Delete</Text>
                  </TouchableOpacity>
                </Animated.View>
              </Pressable>
            )}
          </View>
        </View>
        <TextSemiBold style={styles.title}>{title}</TextSemiBold>
        <View style={styles.contentContainer}>
          <Image
            style={styles.singleImage}
            source={require('../../../assets/images/mockup-post-img.jpeg')}
          />
          <MonoText style={styles.content}>
            {content.substring(0, CONTENT_LENGTH)}
          </MonoText>
        </View>
        <View style={styles.tagsContainer}>
          {tags.map((tag, i) => (
            <Tag key={i} name={tag} />
          ))}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    //ios
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    //android
    elevation: 10,
  },
  cardTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    color: 'rgba(151, 146, 155, 1)',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
  },
  singleImage: {
    borderRadius: 8,
    width: '100%',
    height: 111,
    resizeMode: 'cover',
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 25, // Adjust this value to position the dropdown correctly
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 5,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100, // Ensure the dropdown appears above other elements
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
  },
});
