import { Request, Response } from 'express'
import { registerAccountBodySchema } from '../schemas/accounts-schemas'
import { InvalidateAccountNumberError } from '@/services/errors/invalidate-account-number-error'
import { MakeRegisterAccountService } from '@/services/factories/make-register-account-service'
import { ResourceNotFound } from '@/services/errors/resource-not-found'
import { AccountAlreadyExistsError } from '@/services/errors/account-already-exists-error'

export async function registerAccount(request: Request, response: Response) {
  const { branch, account } = registerAccountBodySchema.parse(request.params)
  const { id: userId } = request.user

  try {
    const makeRegisterAccountService = MakeRegisterAccountService()
    const accountRegistered = await makeRegisterAccountService.execute({
      branch,
      account,
      userId
    })

    return response.status(200).send(accountRegistered)

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

    throw error
  }

}