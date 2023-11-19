import { Request, Response, } from 'express'
import { InvalidateCredentialsError } from '@/services/errors/invalidate-credentials-error'
import { MakeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { authenticateBodySchema } from '../schemas/users-schemas'
import { env } from '@/env'
import jwt from 'jsonwebtoken'

export async function authenticate(request: Request, response: Response) {
  const { document, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = MakeAuthenticateService()
    const { user } = await authenticateService.execute({
      document,
      password,
    })

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '10m' })

    return response.status(201).send({ token })

  } catch (error) {
    if (error instanceof InvalidateCredentialsError) {
      return response.status(409).send({ message: error.message })
    }

    throw error
  }
}
