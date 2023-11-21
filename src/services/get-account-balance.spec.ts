import { describe, it, expect, beforeEach } from 'vitest'
import { GetAccountBalanceService } from './get-account-balance'
import { FakeAccountsRepository } from '@/repositories/fakes/fake-accounts-repository'
import { ResourceNotFound } from './errors/resource-not-found'

let sut: GetAccountBalanceService
let accountsRepository: FakeAccountsRepository

describe('Get account balance service', () => {
  beforeEach(() => {
    accountsRepository = new FakeAccountsRepository()
    sut = new GetAccountBalanceService(accountsRepository)
  })

  it('Should be able to get account balance', async () => {
    const { id: accountId } = await accountsRepository.create({
      branch: '001',
      account: '12345678',
      userId: 'fakeId',
      balance: 10000
    })

    const { balance } = await sut.execute({ accountId })
    expect(balance).toEqual(100)
  })

  it('Should not be able to get balance if not found account', async () => {
    expect(async () => {
      await sut.execute({ accountId: 'fakeId' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
}) 