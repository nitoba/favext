import { Elysia } from 'elysia'

import { authGoogleRouter } from './auth/google'

export const authenticationRouter = new Elysia()

authenticationRouter.group('/auth', (app) => {
  app.use(authGoogleRouter)
  return app
})
