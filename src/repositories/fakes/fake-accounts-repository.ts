import { Account, Prisma } from '@prisma/client'
import { AccountsRepository } from '../accounts-repository'
import { randomUUID } from 'crypto'

export class FakeAccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async getByAccountNumber(accountNumber: string) {
    const account = this.items.find(item => {
      return item.account === accountNumber
    })

    if (!account) {
      return null
    }

    return account
  }

  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = {
      id: randomUUID(),
      branch: data.branch,
      account: data.account,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId
    }

    this.items.push(account)

    return account
  }
}