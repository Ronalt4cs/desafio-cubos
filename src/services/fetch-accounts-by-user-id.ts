import { AccountsRepository } from '@/repositories/accounts-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { getTotalPages } from '@/utils/get-total-pages'
import { Account } from '@prisma/client'
import _default from 'vite-tsconfig-paths'

interface FetchAccountsByUserIdServiceRequest {
  userId?: string
  currentPage?: number
  itemsPerPage?: number
}

interface FetchAccountsByUserIdServiceResponse {
  accounts: Partial<Account>[]
  pagination: {
    totalCount: number
    itemsPerPage: number
    currentPage: number
    pageCount: number
  }
}

export class FetchAccountsByUserIdService {
  constructor(private accountsRepository: AccountsRepository) { }

  async execute({
    userId,
    currentPage,
    itemsPerPage
  }: FetchAccountsByUserIdServiceRequest): Promise<FetchAccountsByUserIdServiceResponse> {

    if (!userId) {
      throw new ResourceNotFound()
    }
    const validCurrentPage = currentPage || 1
    const validItemsPerPage = itemsPerPage || 10

    const { accounts, totalCount } = await this.accountsRepository.fetchByUserId({
      userId,
      currentPage: validCurrentPage,
      itemsPerPage: validItemsPerPage
    })

    const pageCount = getTotalPages(validItemsPerPage, accounts.length)

    const accountsWithoutBalance = accounts.map(accountWithBalance => {
      const { balance: _, userId, ...account } = accountWithBalance
      return account
    })

    return {
      accounts: accountsWithoutBalance,
      pagination: {
        totalCount,
        itemsPerPage: validItemsPerPage,
        currentPage: validCurrentPage,
        pageCount,
      }
    }
  }
}