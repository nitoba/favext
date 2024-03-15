import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { folders } from './folders'
import { users } from './users'

export const links = sqliteTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  ownerId: text('owner_id').references(() => users.id),
  folderId: text('folder_id').references(() => folders.id),
  url: text('url').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const linksRelations = relations(links, ({ one }) => ({
  owner: one(users, {
    fields: [links.ownerId],
    references: [users.id],
    relationName: 'links_to_owner',
  }),
  folders: one(folders, {
    fields: [links.folderId],
    references: [folders.id],
    relationName: 'links_to_folders',
  }),
}))
