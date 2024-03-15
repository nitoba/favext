import { Database } from 'bun:sqlite'
import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import { env } from '@/env'

console.log(chalk.yellowBright('Applying migrations...'))

const sqlite = new Database(`${import.meta.dir}/${env.DB_URL}`)

export const db = drizzle(sqlite)

await migrate(db, { migrationsFolder: 'drizzle' })

console.log(chalk.greenBright('Migrations applied successfully!'))

process.exit()
