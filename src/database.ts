import { Knex, knex as setupKnex } from 'knex'
import { DATABASE_CLIENT, env } from './env'

const getDatabaseConnection = (client: (typeof DATABASE_CLIENT)[number]) => {
  switch (client) {
    case 'sqlite3':
      return {
        filename: env.DATABASE_URL,
      }
    case 'pg':
      return env.DATABASE_URL
  }
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: getDatabaseConnection(env.DATABASE_CLIENT),
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
