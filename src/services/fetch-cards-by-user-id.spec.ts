import { describe, it, expect, beforeEach } from 'vitest'
import { FetchCardsByUserIdService } from './fetch-cards-by-user-id'
import { FakeCardsRepository } from '@/repositories/fakes/fake-cards-repository'

let sut: FetchCardsByUserIdService
let cardsRepository: FakeCardsRepository

describe('Fetch cards by user id service', () => {
  beforeEach(async () => {
    cardsRepository = new FakeCardsRepository()
    sut = new FetchCardsByUserIdService(cardsRepository)

    await cardsRepository.create({
      type: 'physical',
      number: '1111 2222 3333 4444',
      cvv: '123',
      accountId: 'fakeId',
      userId: '123'
    })

    await cardsRepository.create({
      type: 'virtual',
      number: '1111 2222 3333 5555',
      cvv: '321',
      accountId: 'fakeId',
      userId: '123'
    })
  })

  it('Should be able to fetch cards by user id', async () => {
    const { cards, pagination } = await sut.execute({ userId: '123' })

    expect(cards).toHaveLength(2)
    expect(pagination.itemsPerPage).toEqual(10)
    expect(pagination.currentPage).toEqual(1)
    expect(pagination.totalCount).toEqual(2)
    expect(pagination.pageCount).toEqual(1)
  })

  it('Should be able to fetch an empty array of cards if user not have any one registered', async () => {
    const { cards } = await sut.execute({ userId: '1234' })
    expect(cards).toHaveLength(0)
  })

  it('Should be able to fetch an empty array of cards if current page not have any one registered', async () => {
    const { cards } = await sut.execute({ userId: '123', currentPage: 2, itemsPerPage: 10 })
    expect(cards).toHaveLength(0)
  })
})