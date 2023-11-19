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