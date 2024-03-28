import 'knex'

declare module 'knex/types/tables' {
  // eslint-disable-next-line prettier/prettier
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
