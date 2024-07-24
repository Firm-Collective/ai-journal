import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, FlatList, ImageBackground} from 'react-native';
import Post from './Post';
import {useJournalEntries} from '@/providers/JournalEntriesProvider';

export default function HomeScreen() {
  const {journalEntries, isLoading, refreshJournalEntries} =
    useJournalEntries();

  const handleRefresh = () => {
    refreshJournalEntries();
  };

  return (
    <SafeAreaView style={styles.view} edges={['left', 'right']}>
      <ImageBackground
        style={styles.imageBg}
        resizeMode="cover"
        source={require('../../../assets/images/home-screen/gradient-home-screen.png')}
      >
        <FlatList
          data={journalEntries}
          renderItem={({item}) => (
            <Post
              id={item.id}
              date={item.date}
              title={item.title}
              content={item.content}
              tags={item.tags}
            />
          )}
          style={styles.list}
          keyExtractor={item => item.id}
          refreshing={isLoading}
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
