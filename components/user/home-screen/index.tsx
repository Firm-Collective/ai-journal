import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, FlatList, ImageBackground, Text} from 'react-native';
import Post from './Post';
import {useJournalEntries} from '@/providers/JournalEntriesProvider';
import {useNetInfo} from '@react-native-community/netinfo';

export default function HomeScreen() {
  const {type, isConnected} = useNetInfo();
  const {journalEntries, isLoading, refreshJournalEntries} =
    useJournalEntries();

  const handleRefresh = () => {
    refreshJournalEntries();
  };

  // Every single time we click on home page
  // we check to see if there is wifi
  // If yes
  // - then we call the sync function
  // if no wifi, then don't call the sync function

  return (
    <SafeAreaView style={styles.view} edges={['left', 'right']}>
      <ImageBackground
        style={styles.imageBg}
        resizeMode="cover"
        source={require('../../../assets/images/home-screen/gradient-home-screen.png')}
      >
        {isConnected ? (
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
        ) : (
          <Text>You're offline</Text>
        )}
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
