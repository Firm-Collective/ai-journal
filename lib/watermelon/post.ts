import {Model} from '@nozbe/watermelondb';
import {field, date, text} from '@nozbe/watermelondb/decorators';
import {Database} from '@nozbe/watermelondb';
import {database} from './database';
import {Q} from '@nozbe/watermelondb';

export class Post extends Model {
  static table = 'journal_entry';

  @text('title') title!: string;
  @text('text') text!: string;
  @date('created_at') createdAt!: Date;
  @text('user') user!: string;

  // Method to get all posts in watermelonDB
  static async getPostsRecentDate(): Promise<Post[]> {
    const postsCollection = database.get<Post>('journal_entry');
    const allPosts = await postsCollection
      .query(Q.sortBy('created_at', Q.desc))
      .fetch();

    return allPosts;
  }

  // Method to create a new post
  static async createPost(
    database: Database,
    postData: {
      title: string;
      text: string;
      user: string;
    }
  ): Promise<Post> {
    return await database.write(async () => {
      return await database.get<Post>('journal_entry').create(post => {
        post.title = postData.title;
        post.text = postData.text;
        post.user = postData.user;
        post.createdAt = new Date();
      });
    });
  }

  // Method to update an existing post
  static async updatePost(
    database: Database,
    postId: string,
    updateData: {
      title?: string;
      text?: string;
      user?: string;
    }
  ): Promise<Post> {
    return await database.write(async () => {
      const post = await database.get<Post>('journal_entry').find(postId);
      await post.update(postRecord => {
        if (updateData.title !== undefined) {
          postRecord.title = updateData.title;
        }
        if (updateData.text !== undefined) {
          postRecord.text = updateData.text;
        }
        if (updateData.user !== undefined) {
          postRecord.user = updateData.user;
        }
      });
      return post;
    });
  }

  // Method to delete a post
  static async deletePost(database: Database, postId: string): Promise<void> {
    return await database.write(async () => {
      const post = await database.get<Post>('journal_entry').find(postId);
      await post.markAsDeleted(); // soft delete
      // If you want to permanently delete the post, use:
      // await post.destroyPermanently();
    });
  }
}
