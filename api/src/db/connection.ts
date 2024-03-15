import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

import { env } from '@/env'

const sqlite = new Database(env.DB_URL)

export const db = drizzle(sqlite)
