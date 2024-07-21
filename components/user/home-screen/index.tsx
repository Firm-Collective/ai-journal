import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, FlatList, ImageBackground} from 'react-native';
import Post from './Post';
import useFetchJournalEntries from '@/lib/hooks/useFetchJournalEntries';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    date: '08/23/2024',
    title: 'First Item',
    content:
      "Jesus reminds us in Matthew 6:25-34 not to worry about our daily needs but to trust in God's provision. He points to the birds of the of the air and the lilies",
    tags: ['Devotional'],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    date: '08/23/2024',
    title: 'Second Item',
    content:
      "Jesus reminds us in Matthew 6:25-34 not to worry about our daily needs but to trust in God's provision",
    tags: ['Devotional', 'Personal'],
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: '08/23/2024',
    title: 'Third Item',
    content:
      'Spent the afternoon with Alex and his family. I felt truly blessed by our time together. Our time today',
    tags: ['Devotional', 'Personal'],
  },
];

export default function HomeScreen() {
  const {journalEntries, isLoading, refreshJournalEntries} =
    useFetchJournalEntries();
  const [isRefreshing, setisRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setisRefreshing(true);
    refreshJournalEntries();
    setisRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.view}>
      <ImageBackground
        style={styles.imageBg}
        resizeMode="cover"
        source={require('../../../assets/images/home-screen/gradient-home-screen.png')}
      >
        <FlatList
          data={journalEntries}
          renderItem={({item}) => (
            <Post
              date={item.date}
              title={item.title}
              content={item.content}
              tags={item.tags}
            />
          )}
          style={styles.list}
          keyExtractor={item => item.id}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  list: {
    flex: 1,
  },
});
