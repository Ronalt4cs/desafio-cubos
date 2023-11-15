import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidateCredentialsError } from '@/services/errors/invalidate-credentials-error'
import { MakeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const authenticateService = MakeAuthenticateService()
    await authenticateService.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidateCredentialsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
