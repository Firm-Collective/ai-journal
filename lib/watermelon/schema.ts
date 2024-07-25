import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'journal_entry',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'user', type: 'string'},
      ],
    }),
    // Add more tables as needed
  ],
});
