import { Request, Response } from 'express'
import { fetchCardsQuerySchema, registerCardParamsSchema } from '../schemas/cards-schemas'
import { MakeFetchCardsByAccountIdService } from '@/services/factories/make-fetch-cards-by-account-id-service'
import { ZodError } from 'zod'

export async function fetchCardsByAccountId(request: Request, response: Response) {
  try {
    const { accountId } = registerCardParamsSchema.parse(request.params)
    const { currentPage, itemsPerPage } = fetchCardsQuerySchema.parse(request.query)

    const makeFetchCardsByAccountIdService = MakeFetchCardsByAccountIdService()
    const { cards, pagination } = await makeFetchCardsByAccountIdService.execute({ accountId, currentPage, itemsPerPage })

    return response.status(200).send({ cards, pagination })

  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).send({ errors: error.issues })
    }

    throw error
  }
}