import { config } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

import { z } from 'zod'

const NODE_ENV = ['test', 'development', 'staging', 'production'] as const
export const DATABASE_CLIENT = ['pg', 'sqlite3'] as const

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV).default('development'),
  DATABASE_CLIENT: z.enum(DATABASE_CLIENT).default('sqlite3'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
