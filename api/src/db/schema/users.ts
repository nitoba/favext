import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { folders } from './folders'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull(),
  name: text('name').notNull(),
  password: text('password'),
  avatarUrl: text('avatar_url'),
  oauthId: text('oauth_id'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const userRelations = relations(users, ({ many }) => ({
  folders: many(folders, { relationName: 'user_folders' }),
}))
