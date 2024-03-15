import { Google } from 'arctic'

import { env } from '@/env'

const redirectURI = `${env.API_BASE_URL}/auth/login/google/callback`

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  redirectURI,
)

export interface GoogleUser {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
