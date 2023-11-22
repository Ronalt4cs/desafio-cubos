import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { FetchTransactionsByAccountIdService } from '../fetch-transactions-by-account-id'

export function MakeFetchTransactionsByAccountIdService() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const makeFetchTransactionsByAccountIdService = new FetchTransactionsByAccountIdService(transactionsRepository)

  return makeFetchTransactionsByAccountIdService
}