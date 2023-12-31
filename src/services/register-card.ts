import { CardsRepository } from '@/repositories/cards-repository'
import { $Enums, Card } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { PhysicalCardAlreadyExistsError } from './errors/physical-card-already-exists-error'
import { InvalidateCardCvvError } from './errors/invalidate-card-cvv-error'
import { validateCardNumber } from '@/utils/validate-card-number'
import { InvalidateCardNumberError } from './errors/invalidate-card-number-error'
import { CardNumberAlreadyExistsError } from './errors/card-number-already-exist-error'

interface RegisterCardServiceRequest {
  type: $Enums.CardType
  number: string
  cvv: string
  accountId: string
  userId?: string
}

interface RegisterCardServiceResponse {
  card: Partial<Card>
}

export class RegisterCardService {
  constructor(private cardsRepository: CardsRepository) { }

  async execute({
    type,
    cvv,
    number,
    accountId,
    userId
  }: RegisterCardServiceRequest): Promise<RegisterCardServiceResponse> {

    if (!userId) {
      throw new ResourceNotFound()
    }

    if (cvv.trim().length !== 3) {
      throw new InvalidateCardCvvError()
    }

    const isNumberValid = validateCardNumber(number)

    if (!isNumberValid) {
      throw new InvalidateCardNumberError()
    }

    if (type === 'physical') {
      const physicalCardFound = await this.cardsRepository.getPhysicalCardsByAccountId(accountId)

      if (physicalCardFound) {
        throw new PhysicalCardAlreadyExistsError()
      }
    }

    const validCvv = cvv.trim()
    const numberFormated = number.replace(/\D/g, '')

    const isNumberAvailability = await this.cardsRepository.getCardNumberAvailability(numberFormated)

    if (!isNumberAvailability) {
      throw new CardNumberAlreadyExistsError()
    }

    const cardRegistered = await this.cardsRepository.create({
      type,
      number: numberFormated,
      cvv: validCvv,
      accountId,
      userId
    })

    const cardWithLastFourNumber = {
      ...cardRegistered,
      number: cardRegistered.number.slice(-4),
    }

    const { accountId: a, userId: b, ...card } = cardWithLastFourNumber

    return { card }
  }
}