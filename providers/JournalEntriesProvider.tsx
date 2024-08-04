import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import {supabase} from '@/lib/supabase';
import {Alert} from 'react-native';
import {IJournalEntry, IDBJournalEntry} from '@/models/data/IJournalEntry';
import {database} from '@/lib/watermelon/database';
import {Post} from '@/lib/watermelon/post';
import {useNet} from './NetworkProvider';

export type JournalEntriesContextProps = {
  /** All journal entries fetched from DB */
  journalEntries: IJournalEntry[] | undefined;
  /** Whether journal entries are loading */
  isLoading: boolean;
  /** List all journal entries by date (most recent) from DB*/
  listJournalEntriesMostRecent: () => void;
  /** Refresh the home page to get any potential new entries */
  refreshJournalEntries: () => void;
};

const JournalEntriesContext = createContext<
  JournalEntriesContextProps | undefined
>(undefined);

/** Context Provider allows its children to access journal entries fetched from db */
export const JournalEntriesProvider = ({children}: {children: ReactNode}) => {
  const [journalEntries, setJournalEntries] = useState<
    IJournalEntry[] | undefined
  >([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const {isConnected} = useNet();

  const areEntriesEqual = (entry1: IJournalEntry, entry2: IJournalEntry) => {
    return (
      entry1.id === entry2.id &&
      entry1.title === entry2.title &&
      entry1.content === entry2.content &&
      entry1.imagePath === entry2.imagePath &&
      JSON.stringify(entry1.tags) === JSON.stringify(entry2.tags) // Convert tags arrays to JSON strings for comparison
    );
  };

  /**
   * Checks to see if any entries have been changed
   * @param currentEntries is the entries we currently have
   * @param newEntries is the new entries (if there is any)
   * @returns true if there is a change, false otherwise.
   */
  const haveEntriesChanged = (
    currentEntries: IJournalEntry[] | undefined,
    newEntries: IJournalEntry[] | undefined
  ) => {
    if (!currentEntries || !newEntries) return true;
    if (currentEntries.length !== newEntries.length) return true;

    for (let i = 0; i < currentEntries.length; i++) {
      if (!areEntriesEqual(currentEntries[i], newEntries[i])) return true;
    }

    return false;
  };

  const fetchJournalEntriesOffline = useCallback(async () => {
    const data = await Post.getPostsByMostRecentDate(database);
    return data.map(item => ({
      date: new Date(item.createdAt),
      id: item.id.toString(),
      title: item.title,
      content: item.text,
      tags: [], // TODO: If 'tags' is not provided, initialize as an empty array
    }));
  }, []);

  const fetchJournalEntriesOnline = useCallback(async () => {
    const {data, error} = await supabase
      .from('journal_entry')
      .select()
      .order('created_at', {ascending: false});
    if (error) {
      throw error;
    }
    return data.map((item: IDBJournalEntry) => ({
      date: new Date(item.created_at),
      id: item.id.toString(),
      title: item.title,
      content: item.text,
      tags: [], // TODO: If 'tags' is not provided, initialize as an empty array
    }));
  }, []);

  const listJournalEntriesMostRecent = useCallback(async () => {
    setisLoading(true);
    try {
      const newEntries = await fetchJournalEntriesOffline();

      // if entries have changed, then set new posts,
      // otherwise, don't change anything
      if (haveEntriesChanged(journalEntries, newEntries)) {
        setJournalEntries(newEntries);
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
      Alert.alert('Error', 'Failed to load entries');
    } finally {
      setisLoading(false);
    }
  }, [
    isConnected,
    fetchJournalEntriesOnline,
    fetchJournalEntriesOffline,
    journalEntries,
  ]);

  const refreshJournalEntries = useCallback(async () => {
    await listJournalEntriesMostRecent();
  }, [listJournalEntriesMostRecent]);

  useEffect(() => {
    listJournalEntriesMostRecent();
  }, [isConnected, listJournalEntriesMostRecent]);

  return (
    <JournalEntriesContext.Provider
      value={{
        journalEntries,
        isLoading,
        listJournalEntriesMostRecent,
        refreshJournalEntries,
      }}
    >
      {children}
    </JournalEntriesContext.Provider>
  );
};

/** Context hook that allows children wrapped in this provider to use all of its values (journalEnties, isLoading, etc.) */
export const useJournalEntries = () => {
  const context = useContext(JournalEntriesContext);
  if (context === undefined) {
    throw new Error(
      'useJournalEntries must be used within a JournalEntriesProvider'
    );
  }
  return context;
};
