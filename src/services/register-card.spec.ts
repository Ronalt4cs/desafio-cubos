import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterCardService } from './register-card'
import { FakeCardsRepository } from '@/repositories/fakes/fake-cards-repository'
import { InvalidateCardCvvError } from './errors/invalidate-card-cvv-error'
import { InvalidateCardNumberError } from './errors/invalidate-card-number-error'
import { CardAlreadyExistsError } from './errors/card-already-exists-error'

let sut: RegisterCardService
let cardsRepository: FakeCardsRepository

describe('Register cards service', () => {
  beforeEach(() => {
    cardsRepository = new FakeCardsRepository()
    sut = new RegisterCardService(cardsRepository)
  })
  it('should be able to register an card', async () => {
    const { card } = await sut.execute({
      type: 'physical',
      number: '1111 2222 3333 4444',
      cvv: '123',
      accountId: 'fakeId',
      userId: 'fakeId'
    })

    expect(card.id).toEqual(expect.any(String))
    expect(card.number).toEqual('4444')
  })

  it('should not be able to register an card with invalid cvv', async () => {
    expect(async () => {
      await sut.execute({
        type: 'physical',
        number: '1111 2222 3333 4444',
        cvv: '1234',
        accountId: 'fakeId',
        userId: 'fakeId'
      })
    }).rejects.toBeInstanceOf(InvalidateCardCvvError)
  })

  it('should not be able to register an card with invalid card number', async () => {
    expect(async () => {
      await sut.execute({
        type: 'physical',
        number: '1111 2222 3333',
        cvv: '123',
        accountId: 'fakeId',
        userId: 'fakeId'
      })
    }).rejects.toBeInstanceOf(InvalidateCardNumberError)
  })

  it('should not be able to register an physical card if already exist', async () => {
    const accountId = 'sameAccountId'

    await sut.execute({
      type: 'physical',
      number: '1111 2222 3333 4444',
      cvv: '123',
      accountId,
      userId: 'fakeId'
    })

    expect(async () => {
      await sut.execute({
        type: 'physical',
        number: '1111 2222 3333 4444',
        cvv: '123',
        accountId,
        userId: 'fakeId'
      })
    }).rejects.toBeInstanceOf(CardAlreadyExistsError)
  })
})