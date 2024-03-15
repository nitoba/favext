/* eslint-disable camelcase */
import { generateCodeVerifier, generateState } from 'arctic'
import { Elysia, t } from 'elysia'

import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { google, GoogleUser } from '@/lib/auth/google'
import { lucia } from '@/lib/auth/lucia'

const state = generateState()
const codeVerifier = generateCodeVerifier()

export const authGoogleRouter = new Elysia()

authGoogleRouter.get(
  '/login/google',
  async ({ set, cookie: { google_state, google_code_verifier } }) => {
    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ['profile', 'email'],
    })

    google_state.value = state

    google_state.set({
      maxAge: 60 * 10, // 10 minutes,
      httpOnly: true,
      secure: false,
      path: '/',
    })

    google_code_verifier.value = codeVerifier

    google_code_verifier.set({
      maxAge: 60 * 10, // 10 minutes,
      httpOnly: true,
      secure: false,
      path: '/',
    })

    return (set.redirect = url.toString())
  },
)

authGoogleRouter.get(
  '/login/google/callback',
  async ({
    set,
    cookie: { google_code_verifier, google_state, lucia_session },
    query: { code, state },
  }) => {
    const codeVerifier = google_code_verifier.value
    const cookieState = google_state.value

    if (!codeVerifier || !state || !cookieState || state !== cookieState) {
      return (set.status = 'Bad Request')
    }

    const tokens = await google.validateAuthorizationCode(code, codeVerifier)

    const response = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    )

    if (!response.ok) {
      return (set.status = 'Bad Request')
    }

    const user = (await response.json()) as GoogleUser

    google_code_verifier.set({ value: '', expires: new Date(0), maxAge: 0 })
    google_state.set({ value: '', expires: new Date(0), maxAge: 0 })

    const existingUser = await db.query.users.findFirst({
      where: ({ email, oauthId }, { eq, and }) =>
        and(eq(email, user.email), eq(oauthId, user.sub)),
    })

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      lucia_session.value = sessionCookie.value
      lucia_session.set({ ...sessionCookie.attributes })

      return (set.redirect = '/')
    }

    const [newUser] = await db
      .insert(users)
      .values({
        email: user.email,
        name: user.name,
        avatarUrl: user.picture,
        oauthId: user.sub,
      })
      .returning()

    const session = await lucia.createSession(newUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    lucia_session.value = sessionCookie.value
    lucia_session.set({ ...sessionCookie.attributes })

    return (set.redirect = '/')
  },
  {
    query: t.Object({
      code: t.String(),
      state: t.String(),
    }),
  },
)
