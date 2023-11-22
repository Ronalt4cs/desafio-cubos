import { $Enums, Account, Prisma } from '@prisma/client'
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

  async fetchByUserId(data: { userId: string, currentPage: number, itemsPerPage: number }) {
    const accountsFounded = this.items.filter(item => {
      return item.userId === data.userId
    })

    const totalCount = accountsFounded.length
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const accounts = accountsFounded.slice(skip, data.itemsPerPage)

    return { accounts, totalCount }
  }

  async getAccountBalanceById(accountId: string) {
    const account = this.items.find(item => {
      return item.id === accountId
    })

    if (!account) {
      return null
    }

    return account.balance
  }

  async updateAcountBalance(accountId: string, value: number, type: $Enums.TransactionType) {
    const account = this.items.find(item => {
      return item.id === accountId
    })

    if (!account) {
      return null
    }

    const accountWithDiscount = {
      ...account,
      balance: type === 'debit' ? account.balance - value : account.balance + value
    }

    return accountWithDiscount
  }

  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = {
      id: data.id || randomUUID(),
      branch: data.branch,
      account: data.account,
      createdAt: new Date(),
      updatedAt: new Date(),
      balance: data.balance || 0,
      userId: data.userId
    }

    this.items.push(account)

    return account
  }
}