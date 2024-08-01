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

        changes.journal_entry.created.forEach(element => {
          const watermelon_id = element.id;
          const title = element.title;
          const text = element.text;
          const user = element.user;

          entries.push({
            watermelon_id: watermelon_id,
            title: title,
            text: text,
            user: user,
            updated_at: lastPulledAt,
          });
        });

        const {error} = await supabase.from('journal_entry').insert(entries);
        // TODO: do something when there is an error
      }

      if (changes.journal_entry.updated.length > 0) {
        // Logic when there are updated posts
        console.log('newly updated posts', changes.journal_entry.updated);

        changes.journal_entry.updated.forEach(async element => {
          const watermelon_id = element.id;
          const title = element.title;
          const text = element.text;
          const user = element.user;

          // update each post
          const {error} = await supabase
            .from('journal_entries')
            .update({
              watermelon_id: watermelon_id,
              title: title,
              text: text,
              user: user,
              updated_at: lastPulledAt,
            })
            .eq('watermelon_id', watermelon_id);
        });
      }

      if (changes.journal_entry.deleted.length > 0) {
        // Logic when there are deleted posts
        console.log('newley deleted posts', changes.journal_entry.deleted);
        //
        changes.journal_entry.deleted.forEach(async id => {
          const {error} = await supabase
            .from('journal_entry')
            .delete()
            .eq('watermelon_id', id);

          if (error) {
            console.log(error);
          }
        });
      }
    },
  });
}
