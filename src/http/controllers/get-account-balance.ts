import { Request, Response } from 'express'
import { getAccountBalanceParamsSchema } from '../schemas/accounts-schemas'
import { ResourceNotFound } from '@/services/errors/resource-not-found'
import { MakeGetAccountBalanceService } from '@/services/factories/make-get-account-balance-service'

export async function getAccountBalanceById(request: Request, response: Response) {
  const { accountId } = getAccountBalanceParamsSchema.parse(request.params)

  try {
    const makeGetAccountBalanceService = MakeGetAccountBalanceService()
    const { balance } = await makeGetAccountBalanceService.execute({ accountId })

    return response.status(200).send({ balance })

  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ message: error.message })
    }

    throw error
  }
}