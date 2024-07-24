import {Model} from '@nozbe/watermelondb';
import {field, date, text} from '@nozbe/watermelondb/decorators';

export class Post extends Model {
  static table = 'posts';

  @text('title') title!: string;
  @text('body') body!: string;
  @date('created_at') createdAt!: Date;
}
