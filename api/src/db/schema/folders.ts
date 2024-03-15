import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { links } from './links'
import { users } from './users'

export const folders = sqliteTable('folders', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  ownerId: text('owner_id').references(() => users.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const folderRelations = relations(folders, ({ one, many }) => ({
  owner: one(users, {
    fields: [folders.ownerId],
    references: [users.id],
  }),
  links: many(links, { relationName: 'links_to_folders' }),
}))
