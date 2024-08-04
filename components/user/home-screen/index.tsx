import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, FlatList, ImageBackground, Text} from 'react-native';
import Post from './Post';
import {useJournalEntries} from '@/providers/JournalEntriesProvider';
import {useNet} from '@/providers/NetworkProvider';
import {useFocusEffect} from 'expo-router';
import {syncWithServer} from '@/lib/watermelon/sync';
import {database} from '@/lib/watermelon/database';
import {Post as PostFunctions} from '@/lib/watermelon/post';

export default function HomeScreen() {
  const {isConnected} = useNet();
  const [isSyncing, setIsSyncing] = useState(false);
  const {
    journalEntries: initialJournalEntries,
    isLoading,
    refreshJournalEntries,
  } = useJournalEntries();
  const [journalEntries, setJournalEntries] = useState(initialJournalEntries);

  useEffect(() => {
    setJournalEntries(initialJournalEntries);
  }, [initialJournalEntries]);

  const handleRefresh = () => {
    refreshJournalEntries();
  };

  const handleDelete = async (id: string) => {
    await PostFunctions.deletePost(database, id);
    setJournalEntries((prevEntries = []) =>
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  const handleEdit = (id: string) => {
    console.log(id, 'has been edited...');
  };

  useFocusEffect(
    useCallback(() => {
      // makes sure there is no syncing concurrency issues
      let isActive = true;

      const checkConnectionAndSync = async () => {
        handleRefresh();
        if (isConnected && !isSyncing) {
          setIsSyncing(true);
          console.log('we are connected to wifi, syncing with database...');
          try {
            await syncWithServer(database);
          } catch (error) {
            console.error('Sync error:', error);
          } finally {
            if (isActive) {
              setIsSyncing(false);
            }
          }
        } else {
          console.log('we are not connected to wifi or already syncing');
        }
      };

      checkConnectionAndSync();

      return () => {
        isActive = false;
        setIsSyncing(false);
      };
    }, [isConnected, journalEntries])
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
              onDelete={handleDelete}
              onEdit={handleEdit}
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
