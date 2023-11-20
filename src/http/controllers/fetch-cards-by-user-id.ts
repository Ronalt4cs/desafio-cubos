import { Request, Response } from 'express'
import { fetchCardsQuerySchema } from '../schemas/cards-schemas'
import { MakeFetchCardsByUserIdService } from '@/services/factories/make-fetch-cards-by-user-id-service'
import { ResourceNotFound } from '@/services/errors/resource-not-found'

export async function fetchCardsByUserId(request: Request, response: Response) {
  const { currentPage, itemsPerPage } = fetchCardsQuerySchema.parse(request.query)
  const { id: userId } = request.user

  try {
    const makeFetchCardsByUserIdService = MakeFetchCardsByUserIdService()
    const { cards, pagination } = await makeFetchCardsByUserIdService.execute({ userId, currentPage, itemsPerPage })

    return response.status(200).send({ cards, pagination })

  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ message: error.message })
    }

    throw error
  }
}