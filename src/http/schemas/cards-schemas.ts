import z from 'zod'

export const registerCardBodySchema = z.object({
  type: z.enum(['physical', 'virtual']),
  number: z.string(),
  cvv: z.string()
})

export const registerCardParamsSchema = z.object({
  accountId: z.string()
})