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
  SyncDatabaseChangeSet,
} from '@nozbe/watermelondb/sync';

export async function syncWithServer(database: Database): Promise<void> {
  await synchronize({
    database,
    pullChanges: async ({
      lastPulledAt,
      schemaVersion,
      migration,
    }: SyncPullArgs): Promise<SyncPullResult> => {
      // Check if there are any changes within the database and syncs it with local storage

      const {data, error} = await supabase
        .from('journal_entry')
        .select('*')
        .gt('updated_at', lastPulledAt || 0);

      if (error) throw error;

      const changes: SyncDatabaseChangeSet = {
        journal_entry: {
          created: [],
          updated: data.map(post => ({
            id: post.watermelon_id,
            title: post.title,
            text: post.text,
            user: post.user,
          })),
          deleted: [],
        },
      };

      return {
        changes,
        timestamp: Date.now(),
      };
    },
    pushChanges: async ({
      changes,
      lastPulledAt,
    }: {
      changes: SyncDatabaseChangeSet;
      lastPulledAt: number;
    }) => {
      // Checks if there are any changes within local storage and pushes it to supabase

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
        // TODO: logic when there are updated posts
      }

      if (changes.journal_entry.deleted.length > 0) {
        // TODO: logic when there are deleted posts
      }
    },
  });
}
