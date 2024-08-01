import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, FlatList, ImageBackground, Text} from 'react-native';
import Post from './Post';
import {useJournalEntries} from '@/providers/JournalEntriesProvider';
import {useNet} from '@/providers/NetworkProvider';
import {useFocusEffect} from 'expo-router';
import {useCallback} from 'react';
import {syncWithServer} from '@/lib/watermelon/sync';
import {database} from '@/lib/watermelon/database';

export default function HomeScreen() {
  const {type, isConnected} = useNet();
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
  useFocusEffect(
    useCallback(() => {
      const checkConnectionAndSync = async () => {
        // handle refresh will occur every time
        handleRefresh();
        if (isConnected) {
          console.log('we are connected to wifi');
          await syncWithServer(database);
        } else {
          console.log('we are not connected to wifi');
        }
      };

      checkConnectionAndSync();
    }, [isConnected]) // Add isConnected to dependency array
  );

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
