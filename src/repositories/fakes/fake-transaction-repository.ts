import { $Enums, Prisma, Transaction } from '@prisma/client'
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

  async reverseTransactionById(transactionId: string, description: string, type: $Enums.TransactionType) {
    const transactionIndex = this.items.findIndex(item => {
      return item.id === transactionId && !item.reversed
    })

    if (transactionIndex === -1) {
      return null
    }

    this.items[transactionIndex] = {
      ... this.items[transactionIndex],
      reversed: true,
      description,
      type: type === 'credit' ? 'debit' : 'credit'
    }

    const transaction = this.items[transactionIndex]

    return transaction
  }

  async getTransactionById(transactionId: string) {
    const transaction = this.items.find(item => {
      return item.id === transactionId && !item.reversed
    })

    if (!transaction) {
      return null
    }

    return transaction
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: randomUUID(),
      type: data.type,
      value: data.value,
      description: data.description,
      reversed: data.reversed || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: data.accountId,
    }

    this.items.push(transaction)

    return transaction
  }
}