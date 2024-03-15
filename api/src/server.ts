import { Elysia } from 'elysia'

import { authenticationRouter } from './http/routes/authentication'

const app = new Elysia()
app.use(authenticationRouter)
app.listen(3333)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
