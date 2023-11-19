import { describe, it, expect, beforeEach } from 'vitest'
import { FetchAccountsByUserIdService } from './fetch-accounts-by-user-id'
import { FakeAccountsRepository } from '@/repositories/fakes/fake-accounts-repository'

let sut: FetchAccountsByUserIdService
let accountsRepository: FakeAccountsRepository

describe('Fetch accounts by user id service', () => {
  beforeEach(async () => {
    accountsRepository = new FakeAccountsRepository()
    sut = new FetchAccountsByUserIdService(accountsRepository)

    await accountsRepository.create({
      branch: '123',
      account: '12345678',
      userId: '123'
    })

    await accountsRepository.create({
      branch: '321',
      account: '87654321',
      userId: '123'
    })
  })

  it('Should be able to fetch accounts for an user', async () => {
    const { accounts, currentPage, itemsPerPage, pageCount, totalCount } = await sut.execute({
      userId: '123',
    })

    expect(accounts).toHaveLength(2)
    expect(itemsPerPage).toEqual(10)
    expect(currentPage).toEqual(1)
    expect(totalCount).toEqual(2)
    expect(pageCount).toEqual(1)
  })

  it('Should be able to fetch an empty array of accounts if user not have any one registered', async () => {
    const { accounts } = await sut.execute({ userId: '1234' })
    expect(accounts).toHaveLength(0)
  })

  it('Should be able to fetch an empty array of accounts if current page not have any one registered', async () => {
    const { accounts } = await sut.execute({ userId: '123', currentPage: 2, itemsPerPage: 10 })
    expect(accounts).toHaveLength(0)
  })
})