import { CardsRepository } from '@/repositories/cards-repository'
import { getTotalPages } from '@/utils/get-total-pages'
import { Card } from '@prisma/client'

interface FetchCardsByUserIdServiceRequest {
  userId: string
  currentPage?: number
  itemsPerPage?: number
}

interface FetchCardsByUserIdServiceResponse {
  cards: Card[]
  pagination: {
    totalCount: number
    itemsPerPage: number
    currentPage: number
    pageCount: number
  }
}

export class FetchCardsByUserIdService {
  constructor(private cardsRepository: CardsRepository) { }

  async execute({
    userId,
    currentPage,
    itemsPerPage
  }: FetchCardsByUserIdServiceRequest): Promise<FetchCardsByUserIdServiceResponse> {

    const validCurrentPage = currentPage || 1
    const validItemsPerPage = itemsPerPage || 10

    const { cards: cardsFounded, totalCount } = await this.cardsRepository.fetchByUserId({
      userId,
      currentPage: validCurrentPage,
      itemsPerPage: validItemsPerPage
    })

    const cards = cardsFounded.map(card => {
      return {
        ...card,
        number: card.number.slice(-4)
      }
    })

    const pageCount = getTotalPages(validItemsPerPage, totalCount)

    return {
      cards,
      pagination: {
        totalCount,
        itemsPerPage: validItemsPerPage,
        currentPage: validCurrentPage,
        pageCount,
      }
    }
  }
}