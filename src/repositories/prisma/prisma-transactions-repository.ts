import { Prisma, $Enums } from '@prisma/client';
import { FetchTransactionsRequest, TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma';

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data
    })

    return transaction
  }

  async fetchTransactionsByAccountId(data: FetchTransactionsRequest) {
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const take = data.itemsPerPage

    const transactionsInfos = await prisma.$transaction([
      prisma.transaction.count({
        where: {
          accountId: data.accountId,
          AND: {
            OR: [{
              type: data.type,
              description: {
                contains: data.search
              },
            }],
          }
        },
        take,
        skip
      }),
      prisma.transaction.findMany({
        where: {
          accountId: data.accountId,
          AND: {
            OR: [{
              type: data.type,
              description: {
                contains: data.search
              },
            }],
          }
        },
        take,
        skip
      })
    ])

    const totalCount = transactionsInfos[0]
    const transactions = transactionsInfos[1]

    return { transactions, totalCount }
  }
}