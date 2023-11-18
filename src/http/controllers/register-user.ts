import { Request, Response } from 'express'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterUserService } from '@/services/factories/make-register-service'
import { z } from 'zod'

export async function registerUser(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const registerUserService = makeRegisterUserService()
    await registerUserService.execute({
      email,
      name,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    throw error
  }

  return response.status(201).send()
}
