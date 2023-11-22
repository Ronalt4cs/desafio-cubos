import { describe, it, expect, beforeEach } from 'vitest'
import { FetchCardsByAccountIdService } from './fetch-cards-by-account-id'
import { FakeCardsRepository } from '@/repositories/fakes/fake-cards-repository'

let sut: FetchCardsByAccountIdService
let cardsRepository: FakeCardsRepository

describe('Fetch cards by account id service', () => {
  beforeEach(async () => {
    cardsRepository = new FakeCardsRepository()
    sut = new FetchCardsByAccountIdService(cardsRepository)

    await cardsRepository.create({
      type: 'physical',
      number: '1111 2222 3333 4444',
      cvv: '123',
      accountId: '123',
      userId: 'fakeId'
    })

    await cardsRepository.create({
      type: 'virtual',
      number: '1111 2222 3333 5555',
      cvv: '321',
      accountId: '123',
      userId: 'fakeId'
    })
  })

  it('Should be able to fetch cards by account id', async () => {
    const { cards, pagination } = await sut.execute({ accountId: '123' })

    expect(cards).toHaveLength(2)
    expect(pagination.itemsPerPage).toEqual(10)
    expect(pagination.currentPage).toEqual(1)
    expect(pagination.totalCount).toEqual(2)
    expect(pagination.pageCount).toEqual(1)
  })

  it('Should be able to fetch an empty array of cards if account not have any one registered', async () => {
    const { cards } = await sut.execute({ accountId: '1234' })
    expect(cards).toHaveLength(0)
  })

  it('Should be able to fetch an empty array of cards if current page not have any one registered', async () => {
    const { cards } = await sut.execute({ accountId: '123', currentPage: 2, itemsPerPage: 10 })
    expect(cards).toHaveLength(0)
  })
})