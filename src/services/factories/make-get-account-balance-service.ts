import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { GetAccountBalanceService } from '../get-account-balance'

export function MakeGetAccountBalanceService() {
  const accountsRepository = new PrismaAccountsRepository()
  const makeGetAccountBalanceService = new GetAccountBalanceService(accountsRepository)

  return makeGetAccountBalanceService
}