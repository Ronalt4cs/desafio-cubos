import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { reverseTransactionsBodySchema, reverseTransactionsParamsSchema } from '../schemas/transactions-schemas'
import { makeReverseTransactionByIdService } from '@/services/factories/make-reverse-transaction-by-id-service'
import { TransactionAlreadyReversedError } from '@/services/errors/transaction-already-reversed-error'
import { BalanceInsufficientError } from '@/services/errors/balance-insufficient-error'
import { ResourceNotFound } from '@/services/errors/resource-not-found'

export async function reverseTransactionById(request: Request, response: Response) {
  try {
    const { accountId, transactionId } = reverseTransactionsParamsSchema.parse(request.params)
    const { description } = reverseTransactionsBodySchema.parse(request.body)

    const { transaction } = await makeReverseTransactionByIdService({ description, accountId, transactionId })

    return response.status(201).send(transaction)

  } catch (error) {
    if (error instanceof TransactionAlreadyReversedError) {
      return response.status(409).send({ errors: error.message })
    }

    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ errors: error.message })
    }

    if (error instanceof BalanceInsufficientError) {
      return response.status(400).send({ errors: error.message })
    }

    if (error instanceof ZodError) {
      return response.status(400).send({ errors: error.issues })
    }
  }
}