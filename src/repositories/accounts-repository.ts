import { Account, Prisma } from '@prisma/client'

export interface AccountsRepository {
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>
  getByAccountNumber(accountNumber: string): Promise<Account | null>
}