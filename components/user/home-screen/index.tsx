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
import Ionicons from 'react-native-vector-icons/Ionicons';  // Added from David's code
import {useLayout} from '@/components/context/LayoutContext';
import Navbar from '@/components/Navbar';
import {IJournalEntry} from '@/models/data/IJournalEntry';  // Added from David's code
import { TagEdit } from './TagEdit';

export default function HomeScreen() {
  const { layout } = useLayout();
  const {isConnected} = useNet();
  const [isSyncing, setIsSyncing] = useState(false);
  const {
    journalEntries: initialJournalEntries = [],  // Added default value from David's code
    isLoading,
    refreshJournalEntries,
  } = useJournalEntries();
  const [journalEntries, setJournalEntries] = useState(initialJournalEntries);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showTagEdit, setShowTagEdit] = useState(false);

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
  };

  const handleTagSave = async (selectedTags: number[]) => {
    if (selectedPostId) {
      console.log('Saving tags for post:', selectedPostId, selectedTags);
      // TODO: Implement tag saving logic
      // await PostFunctions.updateTags(database, selectedPostId, selectedTags);
    }
    setShowTagEdit(false);
    if (popupRef.current) {
      popupRef.current.scrollTo(CLOSED_POSITION);
    }
  };

  useFocusEffect(
    useCallback(() => {
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
      setShowTagEdit(false);
    }
  };

  type Section = {
    title: string;
    data: IJournalEntry[];
  };
  
  // Using David's type definition for sections
  const [sections, setSections] = useState<Section[]>([]);
  useEffect(() => {
    const groupedEntries = initialJournalEntries.reduce(
      (acc: Record<string, typeof initialJournalEntries>, entry) => {
        console.log('Entry Date:', entry.date);
        const date = entry.date ? new Date(entry.date) : new Date();
        if (isNaN(date.getTime())) {
          console.error(`Invalid date for entry: ${entry.id}`);
          return acc;
        }
        const monthYear = `${date.toLocaleString('default', {month: 'long'})} ${date.getFullYear()}`;
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(entry);
        return acc;
      },
      {}
    );
    const formattedSections = Object.entries(groupedEntries).map(
      ([title, data]) => ({title, data})
    );
    setSections(formattedSections);
  }, [initialJournalEntries]);

  
  const PopupContent = () => (
    <View style={styles.buttons_container}>
      {!showTagEdit ? (
        <>
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
          <TouchableOpacity 
            style={[styles.button, styles.button_border]}
            onPress={() => setShowTagEdit(true)}
          >
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
        </>
      ) : (
        <TagEdit
          onSave={handleTagSave}
          onClose={() => setShowTagEdit(false)}
          initialTags={[]} // TODO: Pass current post's tags
        />
      )}
    </View>
  );
 
  return (
    <SafeAreaView style={styles.view} edges={['left', 'right']}>
      <Navbar />
      {layout === 'horizontal' ? (
        <ImageBackground
          style={styles.imageBg}
          resizeMode="cover"
          source={require('../../../assets/images/home-screen/gradient-home-screen.png')}
        >
          <SectionList
            sections={sections}
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
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            style={styles.list}
            keyExtractor={item => item.id}
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
          <Popup ref={popupRef}>
            <PopupContent />
          </Popup>
          
          {/* David's floating button */}
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
                marginBottom: 15,
              }}
              onPress={() => router.push('/text-entry')}
            >
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          </View>
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
          {/* Same content as horizontal layout */}
          <SectionList
            sections={sections}
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
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            style={styles.list}
            keyExtractor={item => item.id}
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
          <Popup ref={popupRef}>
            <PopupContent />
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
                marginBottom: 15,
              }}
              onPress={() => router.push('/text-entry')}
            >
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <Button
            title="Settings"
            onPress={() => router.push('/profile/settings' as any)}
          />
        </ImageBackground>
      )}
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
  sectionHeader: {
    padding: 6,
    marginTop: 22,
    marginLeft: 5,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#62239B',
  },
});