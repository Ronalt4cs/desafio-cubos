import { $Enums, Account, Prisma } from '@prisma/client'

interface FetchAccountsByUserIdResponse {
  accounts: Account[],
  totalCount: number
}

export interface AccountsRepository {
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>
  getByAccountNumber(accountNumber: string): Promise<Account | null>
  fetchByUserId(data: { userId: string, currentPage: number, itemsPerPage: number }): Promise<FetchAccountsByUserIdResponse>
  getAccountBalanceById(accountId: string): Promise<number | null>
  updateAcountBalance(accountId: string, value: number, type: $Enums.TransactionType): Promise<Account | null>
}