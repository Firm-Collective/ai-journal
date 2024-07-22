// Journal Post
export interface IJournalEntry {
  date: Date; //TODO: or date object?
  id: string;
  title: string;
  content: string;
  imagePath?: string; // TODO: double check what supabase store image under
  tags: string[];
}

// Supabase model
export interface IDBJournalEntry {
  /** ISO 8601 string format **/
  created_at: string;
  id: number;
  text: string;
  title: string;
  /** Unique user id */
  user: string;
}
