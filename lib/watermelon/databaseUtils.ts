// databaseUtils.ts

// Usage example:
// import { database } from './database'
// import { logAllPosts } from './databaseUtils'
//
// logAllPosts(database)

import {Database, Q} from '@nozbe/watermelondb';
import {Post} from './post';

export async function logAllPosts(database: Database) {
  const postsCollection = database.get<Post>('journal_entry');
  const allPosts = await postsCollection.query().fetch();

  console.log('All posts in the local database:');
  allPosts.forEach(post => {
    console.log(
      `watermelon ID: ${post.id}, User: ${post.user}, Created At: ${post.createdAt}, Title: ${post.title}, Text: ${post.text},  `
    );
  });

  console.log(`Total posts: ${allPosts.length}`);
}
