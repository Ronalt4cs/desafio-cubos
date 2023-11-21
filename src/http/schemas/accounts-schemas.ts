import { z } from 'zod'

export const registerAccountBodySchema = z.object({
  branch: z.string(),
  account: z.string()
})

export const fetchAccountsQuerySchema = z.object({
  currentPage: z.number().positive().int().optional(),
  itemsPerPage: z.number().positive().int().optional()
})

export const getAccountBalanceParamsSchema = z.object({
  accountId: z.string()
})