import { PrismaCardsRepository } from '@/repositories/prisma/prisma-cards-repository'
import { RegisterCardService } from '../register-card'

export function MakeRegisterCardService() {
  const cardsRepository = new PrismaCardsRepository()
  const makeRegisterCardService = new RegisterCardService(cardsRepository)

  return makeRegisterCardService
}