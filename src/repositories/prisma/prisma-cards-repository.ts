import { Prisma } from '@prisma/client'
import { CardsRepository } from '../cards-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCardsRepository implements CardsRepository {
  async getPhysicalCardsByAccountId(accountId: string) {
    const card = await prisma.card.findFirst({
      where: {
        accountId,
        type: 'physical'
      }
    })

    return card
  }

  async create(data: Prisma.CardUncheckedCreateInput) {
    const card = await prisma.card.create({
      data
    })

    return card
  }
}