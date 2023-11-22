import z from 'zod'

export const registerTransactionsParamsSchema = z.object({
  accountId: z.string()
})

export const registerTransactionsBodySchema = z.object({
  value: z.number().nonnegative(),
  description: z.string(),
  type: z.enum(['debit', 'credit'])
})

export const fetchTransactionsQuerySchema = z.object({
  search: z.string().optional(),
  type: z.enum(['debit', 'credit']).optional(),
  currentPage: z.coerce.number().positive().int().optional(),
  itemsPerPage: z.coerce.number().positive().int().optional()
})