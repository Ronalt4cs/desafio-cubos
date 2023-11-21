import { Prisma, $Enums } from '@prisma/client';
import { TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma';

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data
    })

    return transaction
  }
}