import { Request, Response, } from 'express'
import { InvalidateCredentialsError } from '@/services/errors/invalidate-credentials-error'
import { MakeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { z } from 'zod'

export async function authenticate(
  request: Request,
  response: Response,
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
      return response.status(409).send({ message: error.message })
    }

    throw error
  }

  return response.status(201).send()
}
