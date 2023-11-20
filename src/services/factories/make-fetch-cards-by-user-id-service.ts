import { FetchCardsByUserIdService } from '../fetch-cards-by-user-id'
import { PrismaCardsRepository } from '@/repositories/prisma/prisma-cards-repository'

export function MakeFetchCardsByUserIdService() {
  const cardsRepository = new PrismaCardsRepository()
  const makeFetchCardsByUserIdService = new FetchCardsByUserIdService(cardsRepository)

  return makeFetchCardsByUserIdService
}