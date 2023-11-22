import { CardsRepository } from '@/repositories/cards-repository'
import { getTotalPages } from '@/utils/get-total-pages'
import { Card } from '@prisma/client'

interface FetchCardsByAccountIdServiceRequest {
  accountId: string
  currentPage?: number
  itemsPerPage?: number
}

interface FetchCardsByAccountIdServiceResponse {
  cards: Partial<Card>[]
  pagination: {
    totalCount: number
    itemsPerPage: number
    currentPage: number
    pageCount: number
  }
}

export class FetchCardsByAccountIdService {
  constructor(private cardsRepository: CardsRepository) { }

  async execute({
    accountId,
    currentPage,
    itemsPerPage
  }: FetchCardsByAccountIdServiceRequest): Promise<FetchCardsByAccountIdServiceResponse> {

    const validCurrentPage = currentPage || 1
    const validItemsPerPage = itemsPerPage || 10

    const { cards: cardsFounded, totalCount } = await this.cardsRepository.fetchByAccountId({
      accountId,
      currentPage: validCurrentPage,
      itemsPerPage: validItemsPerPage
    })

    const cards = cardsFounded.map(item => {
      const { accountId: a, userId: b, ...card } = item

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