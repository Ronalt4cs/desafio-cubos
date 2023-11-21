import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { RegisterTransactionService } from '../register-transaction'

export function MakeRegisterTransactionService() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const accountsRepository = new PrismaAccountsRepository()
  const makeRegisterTransactionService = new RegisterTransactionService(transactionsRepository, accountsRepository)

  return makeRegisterTransactionService
}