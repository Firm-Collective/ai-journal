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
  SectionList,
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
import Navbar from '@/components/Navbar';
import { LayoutProvider } from '@/components/context/LayoutContext';
import { useLayout } from '@/components/context/LayoutContext';


export default function HomeScreen() {
  const { layout } = useLayout();
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
    console.log("Initial Journal Entries Updated:", initialJournalEntries);
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

  // Create the date layout
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const groupedEntries = initialJournalEntries.reduce((acc, entry) => {
      console.log("Entry Date:", entry.date);
      const date = entry.date ? new Date(entry.date) : new Date();
      if (isNaN(date.getTime())) {
        console.error(`Invalid date for entry: ${entry.id}`);
        return acc;
      }
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(entry);
      return acc;
    }, {});
    const formattedSections = Object.entries(groupedEntries).map(([title, data]) => ({ title, data }));
    setSections(formattedSections);
  }, [initialJournalEntries]);
 
  return (
    <SafeAreaView style={styles.view} edges={['left', 'right']}>
      {/* Import navbar */}
      <Navbar/>
      {
        layout === 'horizontal' ? (
          <ImageBackground
          style={styles.imageBg}
          resizeMode="cover"
          source={require('../../../assets/images/home-screen/gradient-home-screen.png')}
          >
          {/* Start of lists */}
          <SectionList
              sections={sections}
              renderItem={({ item }) => (
                <Post
                  id={item.id}
                  date={item.date}
                  title={item.title}
                  content={item.content}
                  tags={item.tags}
                  onOpen={() => openPopupMenu(item.id)}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
              )}
              style={styles.list}
              keyExtractor={(item) => item.id}
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
          <Button title="Create" onPress={() => router.push('/text-entry')} />
          <Button
            title="Settings"
            onPress={() => router.push('/profile/settings' as any)}
          />
        </ImageBackground>

        ) : (
          <ImageBackground
          style={styles.imageBg}
          resizeMode="cover"
          source={require('../../../assets/images/home-screen/white-bg.jpg')}
          >
          {/* Start of lists */}
          <SectionList
              sections={sections}
              renderItem={({ item }) => (
                <Post
                  id={item.id}
                  date={item.date}
                  title={item.title}
                  content={item.content}
                  tags={item.tags}
                  onOpen={() => openPopupMenu(item.id)}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
              )}
              style={styles.list}
              keyExtractor={(item) => item.id}
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
          <Button title="Create" onPress={() => router.push('/text-entry')} />
          <Button
            title="Settings"
            onPress={() => router.push('/profile/settings' as any)}
          />
        </ImageBackground>
        )
      }
      
      
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  sectionHeader: {
    padding: 6,
    marginTop: 22,
    marginLeft: 5
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#62239B',
  },
});
