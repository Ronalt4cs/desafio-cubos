import { z } from 'zod'

export const registerAccountBodySchema = z.object({
  branch: z.string(),
  account: z.string()
})

export const fetchAccountsQuerySchema = z.object({
  currentPage: z.number().positive().int(),
  itemsPerPage: z.number().positive().int()
})