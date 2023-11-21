import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class FakeTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

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