import {Model} from '@nozbe/watermelondb';
import {field, date, text} from '@nozbe/watermelondb/decorators';
import {Database} from '@nozbe/watermelondb';

export class Post extends Model {
  static table = 'journal_entry';

  @text('title') title!: string;
  @text('text') text!: string;
  @date('created_at') createdAt!: Date;
  @text('user') user!: string;

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
}
