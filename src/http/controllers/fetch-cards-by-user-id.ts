import { Request, Response } from 'express'
import { fetchCardsQuerySchema } from '../schemas/cards-schemas'
import { MakeFetchCardsByUserIdService } from '@/services/factories/make-fetch-cards-by-user-id-service'
import { ResourceNotFound } from '@/services/errors/resource-not-found'
import { ZodError } from 'zod'

export async function fetchCardsByUserId(request: Request, response: Response) {
  try {
    const { currentPage, itemsPerPage } = fetchCardsQuerySchema.parse(request.query)
    const { id: userId } = request.user

    const makeFetchCardsByUserIdService = MakeFetchCardsByUserIdService()
    const { cards, pagination } = await makeFetchCardsByUserIdService.execute({ userId, currentPage, itemsPerPage })

    return response.status(200).send({ cards, pagination })

  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ message: error.message })
    }

    if (error instanceof ZodError) {
      return response.status(400).send({ errors: error.issues })
    }

    throw error
  }
}