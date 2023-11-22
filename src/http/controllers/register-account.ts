import { Request, Response } from 'express'
import { registerAccountBodySchema } from '../schemas/accounts-schemas'
import { InvalidateAccountNumberError } from '@/services/errors/invalidate-account-number-error'
import { MakeRegisterAccountService } from '@/services/factories/make-register-account-service'
import { ResourceNotFound } from '@/services/errors/resource-not-found'
import { AccountAlreadyExistsError } from '@/services/errors/account-already-exists-error'
import { ZodError } from 'zod'

export async function registerAccount(request: Request, response: Response) {
  try {
    const { branch, account } = registerAccountBodySchema.parse(request.body)
    const { id: userId } = request.user

    const makeRegisterAccountService = MakeRegisterAccountService()
    const { account: accountRegistered } = await makeRegisterAccountService.execute({
      branch,
      account,
      userId
    })

    return response.status(201).send(accountRegistered)

  } catch (error) {
    if (error instanceof InvalidateAccountNumberError || error instanceof InvalidateAccountNumberError) {
      return response.status(400).send({ message: error.message })
    }

    if (error instanceof AccountAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ message: error.message })
    }

    if (error instanceof ZodError) {
      return response.status(400).send({ errors: error.issues })
    }

    throw error
  }

}