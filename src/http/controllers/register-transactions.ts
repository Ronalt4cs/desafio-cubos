import { Request, Response } from 'express'
import { makeRegisterTransactionService } from '@/services/factories/make-register-transaction-service'
import { registerTransactionsBodySchema, registerTransactionsParamsSchema } from '../schemas/transactions-schemas'
import { BalanceInsufficientError } from '@/services/errors/balance-insufficient-error'
import { ZodError } from 'zod'

export async function registerTransaction(request: Request, response: Response) {
  try {
    const { accountId } = registerTransactionsParamsSchema.parse(request.params)
    const { type, value, description } = registerTransactionsBodySchema.parse(request.body)

    const { transaction } = await makeRegisterTransactionService({
      type,
      value,
      description,
      accountId,
    })

    return response.status(201).send(transaction)

  } catch (error) {
    if (error instanceof BalanceInsufficientError) {
      return response.status(400).send({ message: error.message })
    }

    if (error instanceof ZodError) {
      return response.status(400).send({ errors: error.issues })
    }

    throw error
  }
}
