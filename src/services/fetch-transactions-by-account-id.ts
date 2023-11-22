import { TransactionsRepository } from '@/repositories/transactions-repository'
import { getTotalPages } from '@/utils/get-total-pages'
import { $Enums, Transaction } from '@prisma/client'

interface FetchTransactionsByAccountIdServiceRequest {
  accountId: string
  type?: $Enums.TransactionType
  search?: string
  currentPage?: number
  itemsPerPage?: number
}

interface FetchTransactionsByAccountIdServiceResponse {
  transactions: Partial<Transaction>[]
  pagination: {
    totalCount: number
    itemsPerPage: number
    currentPage: number
    pageCount: number
  }
}

export class FetchTransactionsByAccountIdService {
  constructor(private transactionsRepository: TransactionsRepository) { }

  async execute({
    type,
    search,
    accountId,
    currentPage,
    itemsPerPage,
  }: FetchTransactionsByAccountIdServiceRequest): Promise<FetchTransactionsByAccountIdServiceResponse> {

    const validCurrentPage = currentPage || 1
    const validItemsPerPage = itemsPerPage || 10

    const { transactions: transactionsList, totalCount } = await this.transactionsRepository.fetchTransactionsByAccountId({
      type,
      search,
      accountId,
      currentPage: validCurrentPage,
      itemsPerPage: validItemsPerPage,
    })

    const pageCount = getTotalPages(validItemsPerPage, totalCount)

    const transactions = transactionsList.map(item => {
      const { accountId: _, ...transaction } = item
      const transactionWithValueReal = {
        ...transaction,
        value: transaction.value / 100
      }

      return transactionWithValueReal
    })

    return {
      transactions,
      pagination: {
        totalCount,
        pageCount,
        currentPage: validCurrentPage,
        itemsPerPage: validItemsPerPage,
      }
    }
  }
}