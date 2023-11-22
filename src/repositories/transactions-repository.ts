import { $Enums, Prisma, Transaction } from '@prisma/client'

export interface FetchTransactionsRequest {
  accountId: string
  type?: $Enums.TransactionType
  search?: string
  currentPage: number
  itemsPerPage: number
}

interface FetchTransactionsResponse {
  transactions: Transaction[],
  totalCount: number
}

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  fetchTransactionsByAccountId(data: FetchTransactionsRequest): Promise<FetchTransactionsResponse>
  reverseTransactionById(transactionId: string, description: string, type: $Enums.TransactionType): Promise<Transaction | null>
  getTransactionById(transactionId: string): Promise<Transaction | null>
}