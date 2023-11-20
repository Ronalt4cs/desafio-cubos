import { $Enums, Card, Prisma } from '@prisma/client'

export interface CardsRepository {
  create(data: Prisma.CardUncheckedCreateInput): Promise<Card>
  getPhysicalCardsByAccountId(accountId: string): Promise<Card | null>
}