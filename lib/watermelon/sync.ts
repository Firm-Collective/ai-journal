/**
 * Usage:
 * call syncWithServer and pass in your database. It will the sync your local storage
 * with supabase
 * An example is within Watermelon.tsx
 */

import {synchronize} from '@nozbe/watermelondb/sync';
import {supabase} from '@/lib/supabase';
import {Database} from '@nozbe/watermelondb';
import {
  SyncPullArgs,
  SyncPullResult,
  SyncPushArgs,
  SyncPushResult,
  SyncDatabaseChangeSet,
} from '@nozbe/watermelondb/sync';
import {Post} from './post';

function convertToTimestamp(unixTimestampMs: number) {
  const date = new Date(unixTimestampMs);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}000+00`;
}

export async function syncWithServer(database: Database): Promise<void> {
  await synchronize({
    database,

    /**
     * Check if there are any changes within the supabase (online) and syncs it with WatermelonDB (offline)
     * AKA, if users make changes to their posts online (new posts, edited posts, deleted posts), sync to WatermelonDB
     *
     * 1. Fetch all posts from supabase that were updated since lastPulledAt
     * 2. Copy all the updated posts to updated[] in changes
     * 3. Return changes object and the timestamp as current time according to WatermelonDB doc
     */
    pullChanges: async ({
      lastPulledAt,
      schemaVersion,
      migration,
    }: SyncPullArgs): Promise<SyncPullResult> => {
      const {data, error} = await supabase
        .from('journal_entry')
        .select('*')
        .gt('updated_at', lastPulledAt || 0);

      if (error) throw error;

      const changes: SyncDatabaseChangeSet = {
        journal_entry: {
          // TODO: new posts go to created[]? or already lumped with edited posts in updated[]?
          created: [],
          updated: data.map(post => ({
            id: post.watermelon_id,
            title: post.title,
            text: post.text,
            user: post.user,
          })),
          // TODO: some posts could have been deleted from supabase, need to delete them from WatermelonDB too
          deleted: [],
        },
      };

      return {
        changes,
        timestamp: Date.now(),
      };
    },

    /**
     * Checks if there are any changes within WatermelonDB and pushes it to supabase
     * AKA, if users make changes to their posts offline (new posts, edited posts, deleted posts), sync to Supabase
     * Return nothing
     */
    pushChanges: async ({
      changes,
      lastPulledAt,
    }: SyncPushArgs): Promise<SyncPushResult | undefined | void> => {
      // Logic when there are new created posts
      if (changes.journal_entry.created.length > 0) {
        const entries: any = [];

        console.log('new posts created offline', changes.journal_entry.created);

        changes.journal_entry.created.forEach(element => {
          const watermelon_id = element.id;
          const title = element.title;
          const text = element.text;
          const user = element.user;

          // created_at from watermelonDB is different format than
          // supabase so we have to convert first before pushing.
          const created_at = convertToTimestamp(element.created_at);

          entries.push({
            watermelon_id: watermelon_id,
            title: title,
            text: text,
            user_id: user,
            created_at: created_at,
            updated_at: lastPulledAt,
          });
        });

        const {error} = await supabase.from('journal_entry').insert(entries);
        if (!error) {
          console.log('successfully pushed created posts to supabase');
        } else {
          console.log('error pushing created posts', error);
        }
      }

      if (changes.journal_entry.updated.length > 0) {
        console.log('Newly updated posts:', changes.journal_entry.updated);
        await Promise.all(
          changes.journal_entry.updated.map(async element => {
            const watermelon_id = element.id;
            const title = element.title;
            const text = element.text;

            try {
              const {data, error} = await supabase
                .from('journal_entry')
                .update({
                  title: title,
                  text: text,
                  updated_at: lastPulledAt, // Use current timestamp
                })
                .eq('watermelon_id', watermelon_id);

              if (error) {
                console.error('Error updating post', watermelon_id, error);
              } else {
                console.log('Successfully edited post', watermelon_id, data);
              }
            } catch (error) {
              console.error('Error during update operation', error);
            }
          })
        );
      }

      if (changes.journal_entry.deleted.length > 0) {
        // Logic when there are deleted posts
        console.log('newly deleted posts', changes.journal_entry.deleted);

        try {
          const {error} = await supabase
            .from('journal_entry')
            .delete()
            .in('watermelon_id', changes.journal_entry.deleted);

          if (!error) {
            console.log(
              'Successfully deleted posts from supabase',
              changes.journal_entry.deleted
            );
          } else {
            console.log('Error deleting posts from supabase', error);
          }
        } catch (error) {
          console.log('Exception while deleting posts from supabase', error);
        }
      }
    },
  });
}
