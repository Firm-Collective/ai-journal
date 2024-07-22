import {useEffect, useState, useCallback} from 'react';
import {supabase} from '@/lib/supabase';
import {Alert} from 'react-native';
import {IJournalEntry, IDBJournalEntry} from '@/models/data/IJournalEntry';


export type UseFetchJournalEntriesResult = {
  /** All journal entries fetched from DB */
  journalEntries: IJournalEntry[] | undefined;
  /** Whether journal entries are loading */
  isLoading: boolean;
  /** List all journal entries by date (most recent) from DB*/
  listJournalEntriesMostRecent: () => void;
  /** Refresh the home page to get any potential new entries */
  refreshJournalEntries: () => void;
};

/**
 * Hook to load all journal entries on the home page
 *
 */
const useFetchJournalEntries = (): UseFetchJournalEntriesResult => {
  const [journalEntries, setJournalEntries] = useState<
    IJournalEntry[] | undefined
  >([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  const listJournalEntriesMostRecent = useCallback(async () => {
    try {
      const {data, error} = await supabase
        .from('journal_entry')
        .select()
        .order('created_at', {ascending: false});
      if (error) {
        throw error;
      }

      const mappedData = data.map((item: IDBJournalEntry) => ({
        date: new Date(item.created_at),
        id: item.id.toString(),
        title: item.title,
        content: item.text,
        tags: [], // TODO: If 'tags' is not provided, initialize as an empty array
      }));

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

  return {
    journalEntries,
    isLoading,
    listJournalEntriesMostRecent,
    refreshJournalEntries,
  };
};

export default useFetchJournalEntries;
