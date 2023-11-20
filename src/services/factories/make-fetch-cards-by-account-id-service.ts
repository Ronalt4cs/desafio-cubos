import { FetchCardsByAccountIdService } from '../fetch-cards-by-account-id'
import { PrismaCardsRepository } from '@/repositories/prisma/prisma-cards-repository'

export function MakeFetchCardsByAccountIdService() {
  const cardsRepository = new PrismaCardsRepository()
  const makeFetchCardsByAccountIdService = new FetchCardsByAccountIdService(cardsRepository)

  return makeFetchCardsByAccountIdService
}