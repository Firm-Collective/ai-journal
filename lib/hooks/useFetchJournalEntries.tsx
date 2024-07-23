import {useEffect, useState, useCallback} from 'react';
import {supabase} from '@/lib/supabase';
import {Alert} from 'react-native';
import {IJournalPost, IDBJournalPost} from '@/models/data/IJournalPost';

const timestampConverter = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Hook to load all journal entries on the home page
 *
 */
const useFetchJournalEntries = () => {
  const [journalEntries, setJournalEntries] = useState<
    IJournalPost[] | undefined
  >([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  /** list all journal entries by date (most recent) from DB*/
  const listJournalEntriesMostRecent = useCallback(async () => {
    try {
      const {data, error} = await supabase
        .from('journal_entry')
        .select()
        .order('created_at', {ascending: false});
      if (error) {
        throw error;
      }

      const mappedData = data.map((item: IDBJournalPost) => ({
        date: timestampConverter(item.created_at),
        id: item.id.toString(),
        title: item.title,
        content: item.text,
        tags: [], // If 'tags' is not provided, initialize as an empty array
      }));

      setJournalEntries(mappedData);
    } catch (error) {
      console.error('Error loading journal entries:', error);
      Alert.alert('Error', 'Failed to submit entry');
    } finally {
      setisLoading(false);
    }
  }, [setJournalEntries]);

  /** Refresh the home page to get any potential new entries */
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
