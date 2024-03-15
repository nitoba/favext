import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

import { db } from '@/db/connection'
import { sessions, users } from '@/db/schema'

const adapter = new DrizzleSQLiteAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      //   secure: env === 'PRODUCTION', // set `Secure` flag in HTTPS
      secure: false,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      avatarUrl: attributes.avatarUrl,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: {
      id: string
      name: string
      email: string
      avatarUrl: string
    }
  }
}
