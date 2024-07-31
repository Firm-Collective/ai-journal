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

  const listJournalEntriesMostRecent = useCallback(async () => {
    try {
      const postsCollection = database.get<Post>('journal_entry');
      const data = await postsCollection.query().fetch();

      const mappedData = data.map(item => ({
        date: new Date(item.createdAt),
        id: item.id.toString(),
        title: item.title,
        content: item.text,
        tags: [], // TODO: If 'tags' is not provided, initialize as an empty array
      }));

      mappedData.sort((a: any, b: any) => b.date - a.date);

      setJournalEntries(mappedData);
    } catch (error) {
      console.error('Error loading journal entries:', error);
      Alert.alert('Error', 'Failed to submit entry');
    } finally {
      setisLoading(false);
    }
  }, [setJournalEntries]);

  const refreshJournalEntries = useCallback(async () => {
    setJournalEntries(undefined);
    await listJournalEntriesMostRecent();
  }, []);

  useEffect(() => {
    listJournalEntriesMostRecent();
  }, []);

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
