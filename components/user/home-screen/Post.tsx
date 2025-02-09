import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card} from '@rneui/themed';
import {Text, TextSemiBold} from '@/components/StyledText';
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
  onOpen,
}: IJournalEntry & {
  onOpen: () => void;
}) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.date}>{dateToStringConverter(date)}</Text>
        <View>
          <TouchableOpacity onPress={onOpen}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/home-screen/more-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextSemiBold style={styles.title}>{title}</TextSemiBold>
      <View style={styles.contentContainer}>
        {/*
        <Image
          style={styles.singleImage}
          source={require('../../../assets/images/mockup-post-img.jpeg')}
        />
        */}
        <Text style={styles.content}>
          {content.substring(0, CONTENT_LENGTH)}
        </Text>
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, i) => (
          <Tag key={i} name={tag} />
        ))}
      </View>
    </Card>
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
