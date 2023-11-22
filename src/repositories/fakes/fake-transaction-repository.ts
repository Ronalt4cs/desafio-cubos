import { Prisma, Transaction } from '@prisma/client'
import { FetchTransactionsRequest, TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class FakeTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async fetchTransactionsByAccountId(data: FetchTransactionsRequest) {
    let transactions: Transaction[] = []

    const transactionsFound = this.items.filter(item => {
      return item.accountId === data.accountId
    })

    transactions.push(...transactionsFound)

    if (data.type) {
      const transactionsByType = transactionsFound.filter(item => {
        return item.type === data.type
      })

      transactions = transactionsByType
    }

    if (data.search) {
      const transactionsByDescription = transactionsFound.filter(item => {
        return item.description.includes(String(data.search))
      })

      transactions = transactionsByDescription
    }

    const totalCount = transactions.length
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const transactionsPaginated = transactions.slice(skip, data.itemsPerPage)

    return { transactions: transactionsPaginated, totalCount }
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: randomUUID(),
      type: data.type,
      value: data.value,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: data.accountId,
    }

    this.items.push(transaction)

    return transaction
  }
}