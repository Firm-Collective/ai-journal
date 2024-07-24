/**
 * Usage:
 * call syncWithServer and pass in your database. It will the sync your local storage
 * with supabase
 */

import {synchronize} from '@nozbe/watermelondb/sync';
import {supabase} from '@/lib/supabase'; // Your Supabase client
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
      const {data, error} = await supabase
        .from('posts')
        .select('*')
        .gt('updated_at', lastPulledAt || 0);

      if (error) throw error;

      const changes: SyncDatabaseChangeSet = {
        posts: {
          created: [],
          updated: data.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            created_at: post.created_at,
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
      // Implement logic to push local changes to Supabase
      // This depends on your specific Supabase setup
      console.log('Pushing changes:', changes);
    },
  });
}
