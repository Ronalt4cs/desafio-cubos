import { Card, Prisma } from '@prisma/client'

interface FetchCardsResponse {
  cards: Card[],
  totalCount: number
}

export interface CardsRepository {
  create(data: Prisma.CardUncheckedCreateInput): Promise<Card>
  getPhysicalCardsByAccountId(accountId: string): Promise<Card | null>
  fetchByAccountId(data: { accountId: string, currentPage: number, itemsPerPage: number }): Promise<FetchCardsResponse>
}