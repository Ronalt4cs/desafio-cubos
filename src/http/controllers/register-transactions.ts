import { Request, Response } from 'express'
import { MakeRegisterTransactionService } from '@/services/factories/make-register-transaction-service'
import { registerTransactionsBodySchema } from '../schemas/transactions-schemas'
import { BalanceInsufficientError } from '@/services/errors/balance-insufficient-error'

export async function registerTransaction(request: Request, resonse: Response) {
  const { accountId } = request.params
  const { type, value, description } = registerTransactionsBodySchema.parse(request.body)

  try {
    const makeRegisterTransactionService = MakeRegisterTransactionService()
    const transaction = await makeRegisterTransactionService.execute({
      type,
      value,
      description,
      accountId,
    })

    return resonse.status(201).send(transaction)

  } catch (error) {
    if (error instanceof BalanceInsufficientError) {
      return resonse.status(400).send({ message: error.message })
    }

    throw error
  }
}
