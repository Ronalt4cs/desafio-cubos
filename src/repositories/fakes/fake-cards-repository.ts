import { Prisma, Card } from '@prisma/client'
import { CardsRepository } from '../cards-repository'
import { randomUUID } from 'crypto'

export class FakeCardsRepository implements CardsRepository {
  public items: Card[] = []

  async getPhysicalCardsByAccountId(accountId: string) {
    const card = this.items.find(item => {
      return item.accountId === accountId && item.type === 'physical'
    })

    if (!card) {
      return null
    }

    return card
  }

  async fetchByAccountId(data: { accountId: string, currentPage: number, itemsPerPage: number }) {
    const cardsFounded = this.items.filter(item => {
      return item.accountId === data.accountId
    })

    const totalCount = cardsFounded.length
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const cards = cardsFounded.slice(skip, data.itemsPerPage)

    return { cards, totalCount }
  }

  async fetchByUserId(data: { userId: string, currentPage: number, itemsPerPage: number }) {
    const cardsFounded = this.items.filter(item => {
      return item.userId === data.userId
    })

    const totalCount = cardsFounded.length
    const skip = (data.currentPage - 1) * data.itemsPerPage
    const cards = cardsFounded.slice(skip, data.itemsPerPage)

    return { cards, totalCount }
  }

  async getCardNumberAvailability(cardNumber: string) {
    const card = this.items.find(item => {
      return item.number === cardNumber
    })

    if (card) {
      return false
    }

    return true
  }

  async create(data: Prisma.CardUncheckedCreateInput) {
    const card = {
      id: randomUUID(),
      type: data.type,
      number: data.number,
      cvv: data.cvv,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
      accountId: data.accountId,
    }

    this.items.push(card)

    return card
  }
}