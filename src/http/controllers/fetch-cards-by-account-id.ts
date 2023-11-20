import { Request, Response } from 'express'
import { fetchCardsQuerySchema, registerCardParamsSchema } from '../schemas/cards-schemas'
import { MakeFetchCardsByAccountIdService } from '@/services/factories/make-fetch-cards-by-account-id-service'

export async function fetchCardsByAccountId(request: Request, response: Response) {
  const { accountId } = registerCardParamsSchema.parse(request.params)
  const { currentPage, itemsPerPage } = fetchCardsQuerySchema.parse(request.query)

  try {
    const makeFetchCardsByAccountIdService = MakeFetchCardsByAccountIdService()
    const { cards, pagination } = await makeFetchCardsByAccountIdService.execute({ accountId, currentPage, itemsPerPage })

    return response.status(200).send({ cards, pagination })

  } catch (error) {

    throw error
  }
}