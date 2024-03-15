import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: env.DB_URL,
  },
} satisfies Config
