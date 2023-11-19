import { Prisma } from '@prisma/client';
import { AccountsRepository } from '../accounts-repository'
import { prisma } from '@/lib/prisma';

export class PrismaAccountsRepository implements AccountsRepository {
  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = await prisma.account.create({
      data
    })

    return account
  }
}