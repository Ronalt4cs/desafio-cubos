import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateAccountBalanceService } from './update-account-balance'
import { FakeAccountsRepository } from '@/repositories/fakes/fake-accounts-repository'
import { ResourceNotFound } from './errors/resource-not-found'


let sut: UpdateAccountBalanceService
let accountsRepository: FakeAccountsRepository

describe('Update account balance Service', () => {
  beforeEach(() => {
    accountsRepository = new FakeAccountsRepository()
    sut = new UpdateAccountBalanceService(accountsRepository)
  })

  it('Should be able to discount value of debit transactions to an account', async () => {
    const { id: accountId } = await accountsRepository.create({
      branch: '001',
      account: '12345678',
      userId: 'fakeId',
      balance: 10000
    })

    const { account } = await sut.execute({ accountId, value: 2000, type: 'debit' })
    expect(account.balance).toEqual(8000)
  })

  it('Should be able to increment value of credit transactions to an account', async () => {
    const { id: accountId } = await accountsRepository.create({
      branch: '001',
      account: '12345678',
      userId: 'fakeId',
      balance: 10000
    })

    const { account } = await sut.execute({ accountId, value: 2000, type: 'credit' })
    expect(account.balance).toEqual(12000)
  })

  it('Should not be able to discount value to an account if not found account', async () => {
    expect(async () => {
      await sut.execute({ accountId: 'fakeId', value: 123, type: 'credit' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})