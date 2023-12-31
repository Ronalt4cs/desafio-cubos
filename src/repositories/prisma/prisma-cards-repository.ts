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

  async fetchByAccountId(data: { accountId: string; currentPage: number; itemsPerPage: number }) {
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const take = data.itemsPerPage

    const cardsInfos = await prisma.$transaction([
      prisma.card.count({
        where: {
          accountId: data.accountId
        }
      }),
      prisma.card.findMany({
        where: {
          accountId: data.accountId
        },
        take,
        skip
      })
    ])

    const totalCount = cardsInfos[0]
    const cards = cardsInfos[1]

    return { cards, totalCount }
  }

  async fetchByUserId(data: { userId: string; currentPage: number; itemsPerPage: number }) {
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const take = data.itemsPerPage

    const cardsInfos = await prisma.$transaction([
      prisma.card.count({
        where: {
          userId: data.userId
        }
      }),
      prisma.card.findMany({
        where: {
          userId: data.userId
        },
        take,
        skip
      })
    ])

    const totalCount = cardsInfos[0]
    const cards = cardsInfos[1]

    return { cards, totalCount }
  }

  async getCardNumberAvailability(cardNumber: string) {
    const card = await prisma.card.findUnique({
      where: {
        number: cardNumber
      }
    })

    if (card) {
      return false
    }

    return true
  }

  async create(data: Prisma.CardUncheckedCreateInput) {
    const card = await prisma.card.create({
      data
    })

    return card
  }
}