import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
  DB_URL: z.string(),
})

export const env = envSchema.parse(process.env)
