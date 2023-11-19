import { Prisma } from '@prisma/client';
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

  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = await prisma.account.create({
      data
    })

    return account
  }
}