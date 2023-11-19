import { Request, Response } from 'express'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterUserService } from '@/services/factories/make-register-user-service'
import { registerUserBodySchema } from '../schemas/users-schemas'
import { InvalidateDocumentError } from '@/services/errors/invalidate-document-error'

export async function registerUser(request: Request, response: Response) {
  const { document, name, password } = registerUserBodySchema.parse(request.body)

  try {
    const registerUserService = makeRegisterUserService()
    const user = await registerUserService.execute({
      name,
      document,
      password,
    })

    return response.status(201).send({ user })

  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    if (error instanceof InvalidateDocumentError) {
      return response.status(400).send({ message: error.message })
    }

    throw error
  }
}
