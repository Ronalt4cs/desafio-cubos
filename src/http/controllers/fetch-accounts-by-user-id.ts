import { MakeFetchAccountsByUserIdService } from '@/services/factories/make-fetch-acccounts-by-user-id-service'
import { Request, Response } from 'express'
import { fetchAccountsQuerySchema } from '../schemas/accounts-schemas'

export async function fetchAccountsByUserId(request: Request, response: Response) {
  const { id: userId } = request.user
  const { currentPage, itemsPerPage } = fetchAccountsQuerySchema.parse(request.query)

  try {
    const makeFetchAccountsByUserIdService = MakeFetchAccountsByUserIdService()
    const { accounts, pagination } = await makeFetchAccountsByUserIdService.execute({
      userId, currentPage, itemsPerPage
    })

    return response.status(200).send({ accounts, pagination })

  } catch (error) {
    throw error
  }

}