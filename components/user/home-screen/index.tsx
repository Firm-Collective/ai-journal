import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Button,
} from 'react-native';
import Post from './Post';
import {useJournalEntries} from '@/providers/JournalEntriesProvider';
import {useNet} from '@/providers/NetworkProvider';
import {useFocusEffect} from 'expo-router';
import {syncWithServer} from '@/lib/watermelon/sync';
import {database} from '@/lib/watermelon/database';
import {Post as PostFunctions} from '@/lib/watermelon/post';
import {router} from 'expo-router';
import {Popup, SCROLL_DESTINATION, CLOSED_POSITION, PopupRef} from './Popup';
import {Text} from '@/components/StyledText';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const {isConnected} = useNet();
  const [isSyncing, setIsSyncing] = useState(false);
  const {
    journalEntries: initialJournalEntries,
    isLoading,
    refreshJournalEntries,
  } = useJournalEntries();
  const [journalEntries, setJournalEntries] = useState(initialJournalEntries);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    setJournalEntries(initialJournalEntries);
  }, [initialJournalEntries]);

  const handleRefresh = () => {
    refreshJournalEntries();
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
    if (popupRef.current) {
      popupRef.current.scrollTo(CLOSED_POSITION);
    }
  };

  const handleDelete = async (id: string) => {
    await PostFunctions.deletePost(database, id);
    setJournalEntries((prevEntries = []) =>
      prevEntries.filter(entry => entry.id !== id)
    );
    if (popupRef.current) {
      popupRef.current.scrollTo(CLOSED_POSITION);
    }
    // reroute to main to trigger sync
  };

  useFocusEffect(
    useCallback(() => {
      // makes sure there is no syncing concurrency issues

      const checkConnectionAndSync = async () => {
        handleRefresh();
        if (isConnected && !isSyncing) {
          setIsSyncing(true);
          console.log('we are connected to wifi, syncing with database...');
          try {
            console.log('SYNC RUNNING');
            await syncWithServer(database);
          } catch (error) {
            console.error('Sync error:', error);
          } finally {
            setIsSyncing(false);
          }
        } else {
          console.log('we are not connected to wifi or already syncing');
        }
      };

      checkConnectionAndSync();
    }, [isConnected, journalEntries])
  );

  const popupRef = useRef<PopupRef>(null);

  const openPopupMenu = (id: string) => {
    if (popupRef.current) {
      popupRef.current.scrollTo(SCROLL_DESTINATION);
      setSelectedPostId(id);
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      <ImageBackground
        style={styles.imageBg}
        resizeMode="cover"
        source={require('../../../assets/images/home-screen/gradient-home-screen.png')}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 25,
          }}
        >
          <TouchableOpacity
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => {}} // TODO: search logic
          >
            <Ionicons name="search" size={32} color="rgba(142, 87, 192, 1)" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/profile/settings')}
            style={{
              width: 42,
              height: 42,
              borderRadius: 28,
              overflow: 'hidden', // ensures the image stays within the circle
            }}
          >
            <Image
              source={require('../../../assets/images/User/defaultAvatar.jpeg')} // update avatar URL
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 28,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={journalEntries}
          renderItem={({item}) => (
            <Post
              id={item.id}
              date={item.date}
              title={item.title}
              content={item.content}
              tags={item.tags}
              onOpen={() => openPopupMenu(item.id)}
            />
          )}
          style={styles.list}
          keyExtractor={item => item.id}
          refreshing={isLoading}
          onRefresh={handleRefresh}
        />

        {/* Popup menu to edit, delete selected post */}
        <Popup ref={popupRef}>
          <View style={styles.buttons_container}>
            <TouchableOpacity
              style={[styles.button, styles.button_border]}
              onPress={() => {
                if (selectedPostId) {
                  handleEdit(selectedPostId);
                }
              }}
            >
              <Image
                source={require('../../../assets/images/home-screen/Pencil.png')}
              />
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.button_border]}>
              <Image
                source={require('../../../assets/images/home-screen/Bookmark.png')}
              />
              <Text>Mark As Favourite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.button_border]}>
              <Image
                source={require('../../../assets/images/home-screen/Price Tag.png')}
              />
              <Text>Edit Tag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (selectedPostId) {
                  handleDelete(selectedPostId);
                }
              }}
            >
              <Image
                source={require('../../../assets/images/home-screen/Delete.png')}
              />
              <Text style={{color: '#F34848'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.button_border]}
              onPress={() => {
                router.push('/profile/settings' as any);
              }}
            >
              <Text>Settings (WIP)</Text>
            </TouchableOpacity>
          </View>
        </Popup>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 25,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(142, 87, 192, 1)',
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => router.push('/text-entry')}
          >
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        </View>
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
  buttons_container: {
    flex: 1,
    flexDirection: 'column',
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
