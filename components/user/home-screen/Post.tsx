import { Image, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '@rneui/themed';
import { Text, TextSemiBold } from '@/components/StyledText';
import Tag from './Tag';
import { IJournalEntry } from '@/models/data/IJournalEntry';
import { useLayout } from '@/components/context/LayoutContext';

const CONTENT_LENGTH = 200;

const formatDate = (date: Date, layout: 'vertical' | 'horizontal') => {
  const options = layout === 'vertical' 
    ? { weekday: 'short', day: 'numeric' } // Mon 26
    : { weekday: 'long', month: 'long', day: 'numeric' }; // Monday, August 26

  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  
  if (layout === 'horizontal') {
    return formattedDate;
  }

  // Split the formatted date into parts for vertical layout
  const [weekday, day] = formattedDate.split(' ');
  return `${weekday} ${day}`;  // Return a formatted string instead of an object
};

const Post = ({ id, date, title, imagePath, content, tags, onOpen }: IJournalEntry & { onOpen: () => void }) => {
  const { layout } = useLayout(); // Access the selected layout
  const dateString = formatDate(date, layout); // Get formatted date as string

  return (
    <SafeAreaView>

    {/* <Card containerStyle={styles.card}> */}
      {layout === 'vertical' ? (
        <View style={styles.verticalLayout}>
          <View style={styles.dateContainer}>
            {/* Display weekday above day */}
            <Text style={styles.weekday}>{dateString.split(' ')[0]}</Text>
            <Text style={styles.boldDate}>{dateString.split(' ')[1]}</Text>
          </View>

          <View style={styles.verticalLayoutSubcontainer}>
            <View style={styles.cardTop}>
              <TextSemiBold style={styles.verticalTitle}>{title}</TextSemiBold>
              <TouchableOpacity onPress={onOpen}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/home-screen/more-icon.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{content.substring(0, CONTENT_LENGTH)}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.horizontalLayout}>
          <View style={styles.cardTop}>
            <Text style={styles.date}>{dateString}</Text>
            <TouchableOpacity onPress={onOpen}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/home-screen/more-icon.png')}
              />
            </TouchableOpacity>
          </View>
          <TextSemiBold style={styles.title}>{title}</TextSemiBold>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content.substring(0, CONTENT_LENGTH)}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {tags.map((tag, i) => (
              <Tag key={i} name={tag} />
            ))}
          </View>
        </View>
      )}
    {/* </Card> */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    paddingVertical: 14,
    paddingHorizontal: 15,
    margin: 0, 
    shadowColor: 'rgba(0, 0, 0, 0)',
    //ios
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    //android
    elevation: 10,
    backgroundColor: 'transparent'
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
  boldDate: {
    fontWeight: 'bold',  // Makes the day number bold
  },
  dateVertical: {
    fontSize: 16,  // Enlarge the font size for the date in vertical layout
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
  },
  verticalTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    gap: 10,
    marginBottom: 20,
  },
  content: {
    fontSize: 13,
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
  verticalLayout: {
    flexDirection: 'row',
    flex: 1,
    gap: 20,
    borderWidth: 0,
    paddingVertical: 14,
    paddingHorizontal: 15,
    shadowColor: 'rgba(0, 0, 0, 0)',
    //ios
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    //android
    elevation: 10,
    backgroundColor: 'white',
  },
  verticalLayoutSubcontainer: {
    flex: 4,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Ensures weekday is above the day number
    gap: 3,
  },
  weekday: {
    fontSize: 14,
    color: 'black',
  },
  boldDate: {
    fontWeight: 'bold', 
    fontSize: 14,  // You can adjust this size as needed
  },
  horizontalLayout: {
    marginTop: 20,
    marginHorizontal: 15,
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
  
});

export default Post;






