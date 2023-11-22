import { Request, Response } from 'express'
import { registerCardBodySchema, registerCardParamsSchema } from '../schemas/cards-schemas'
import { InvalidateCardCvvError } from '@/services/errors/invalidate-card-cvv-error'
import { InvalidateCardNumberError } from '@/services/errors/invalidate-card-number-error'
import { CardAlreadyExistsError } from '@/services/errors/card-already-exists-error'
import { ResourceNotFound } from '@/services/errors/resource-not-found'
import { MakeRegisterCardService } from '@/services/factories/make-register-card-service'
import { ZodError } from 'zod'

export async function registerCard(request: Request, response: Response) {
  const { id: userId } = request.user
  const { accountId } = registerCardParamsSchema.parse(request.params)
  const { type, number, cvv } = registerCardBodySchema.parse(request.body)

  try {
    const makeRegisterCardService = MakeRegisterCardService()
    const { card } = await makeRegisterCardService.execute({
      cvv,
      type,
      number,
      userId,
      accountId,
    })

    return response.status(201).send(card)

  } catch (error) {
    if (error instanceof InvalidateCardCvvError || error instanceof InvalidateCardNumberError) {
      return response.status(400).send({ message: error.message })
    }

    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ message: error.message })
    }

    if (error instanceof CardAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    if (error instanceof ZodError) {
      return response.status(400).send({ errors: error.issues })
    }

    throw error
  }
}