import { z } from 'zod'

export const registerUserBodySchema = z.object({
  name: z.string(),
  document: z.string(),
  password: z.string().min(6),
})