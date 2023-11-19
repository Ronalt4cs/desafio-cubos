import { z } from 'zod'

export const registerAccountBodySchema = z.object({
  branch: z.string(),
  account: z.string()
})