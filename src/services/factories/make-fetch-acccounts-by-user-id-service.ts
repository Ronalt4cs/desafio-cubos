import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { FetchAccountsByUserIdService } from '../fetch-accounts-by-user-id'

export function MakeFetchAccountsByUserIdService() {
  const accountsRepository = new PrismaAccountsRepository()
  const makeFetchAccountsByUserIdService = new FetchAccountsByUserIdService(accountsRepository)

  return makeFetchAccountsByUserIdService
}