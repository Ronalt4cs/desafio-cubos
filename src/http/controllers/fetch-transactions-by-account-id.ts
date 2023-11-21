import { Request, Response } from 'express'
import { fetchTransactionsQuerySchema, registerTransactionsParamsSchema } from '../schemas/transactions-schemas'
import { MakeFetchTransactionsByAccountIdService } from '@/services/factories/make-fetch-transactions-by-account-id-service'

export async function fetchTransactionsByAccountId(request: Request, response: Response) {
  const { currentPage, itemsPerPage, search, type } = fetchTransactionsQuerySchema.parse(request.query)
  const { accountId } = registerTransactionsParamsSchema.parse(request.params)

  try {
    const makeFetchTransactionsByAccountIdService = MakeFetchTransactionsByAccountIdService()
    const { transactions, pagination } = await makeFetchTransactionsByAccountIdService.execute({
      type,
      search,
      accountId,
      currentPage,
      itemsPerPage,
    })

    return response.status(200).send({ transactions, pagination })

  } catch (error) {
    throw error
  }
}