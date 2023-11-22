import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { RegisterAccountService } from '../register-account'

export function MakeRegisterAccountService() {
  const accountsRepository = new PrismaAccountsRepository()
  const makeRegisterAccountService = new RegisterAccountService(accountsRepository)

  return makeRegisterAccountService
}