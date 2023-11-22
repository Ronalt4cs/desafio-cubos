import { $Enums, Prisma } from '@prisma/client';
import { AccountsRepository } from '../accounts-repository'
import { prisma } from '@/lib/prisma';

export class PrismaAccountsRepository implements AccountsRepository {
  async getByAccountNumber(accountNumber: string) {
    const account = await prisma.account.findUnique({
      where: {
        account: accountNumber
      }
    })

    return account
  }

  async fetchByUserId(data: { userId: string, currentPage: number, itemsPerPage: number }) {
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const take = data.itemsPerPage

    const accountsInfos = await prisma.$transaction([
      prisma.account.count({
        where: {
          userId: data.userId
        }
      }),
      prisma.account.findMany({
        where: {
          userId: data.userId
        },
        skip,
        take
      })
    ])

    const totalCount = accountsInfos[0]
    const accounts = accountsInfos[1]

    return { accounts, totalCount }
  }

  async getAccountBalanceById(accountId: string) {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId
      },
      select: {
        balance: true
      }
    })

    if (!account) {
      return null
    }

    return account.balance
  }

  async updateAcountBalance(accountId: string, value: number, type: $Enums.TransactionType) {
    const account = await prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: type === 'debit' ? {
          decrement: value
        } : {
          increment: value
        }
      }
    })

    return account
  }

  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = await prisma.account.create({
      data
    })

    return account
  }
}