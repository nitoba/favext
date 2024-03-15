/* eslint-disable n/no-path-concat */
import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: `file:${__dirname}/src/db/${env.DB_URL}`,
  },
} satisfies Config
