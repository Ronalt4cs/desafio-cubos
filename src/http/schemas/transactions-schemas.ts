import z from 'zod'

export const registerTransactionsParamsSchema = z.object({
  accountId: z.string()
})

export const registerTransactionsBodySchema = z.object({
  value: z.number().nonnegative(),
  description: z.string(),
  type: z.enum(['debit', 'credit'])
})