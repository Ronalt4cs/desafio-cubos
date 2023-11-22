import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterAccountService } from './register-account'
import { FakeAccountsRepository } from '@/repositories/fakes/fake-accounts-repository'
import { InvalidateBranchError } from './errors/invalidate-branch-error'
import { InvalidateAccountNumberError } from './errors/invalidate-account-number-error'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'

let sut: RegisterAccountService
let accountsRepository: FakeAccountsRepository

describe('Register Accounts Service', () => {

  beforeEach(() => {
    accountsRepository = new FakeAccountsRepository()
    sut = new RegisterAccountService(accountsRepository)
  })

  it('Should be able to register an account', async () => {
    const { account } = await sut.execute({
      branch: '001',
      account: '12345678',
      userId: 'fakeId'
    })

    expect(account.id).toEqual(expect.any(String))
  })

  it('Should not be able to register account with branch digits length difference of 3', async () => {
    expect(async () => {
      await sut.execute({
        branch: '1234',
        account: '12345678',
        userId: 'fakeId'
      })
    }).rejects.toBeInstanceOf(InvalidateBranchError)
  })

  it('Should not be able to register account with account number digits length difference of 8', async () => {
    expect(async () => {
      await sut.execute({
        branch: '123',
        account: '1234567',
        userId: 'fakeId'
      })
    }).rejects.toBeInstanceOf(InvalidateAccountNumberError)
  })

  it('Should not be able to register an account with same account number twice', async () => {
    const account = '12345678'

    await sut.execute({
      branch: '001',
      account,
      userId: 'fakeId'
    })

    expect(async () => {
      await sut.execute({
        branch: '001',
        account,
        userId: 'fakeId'
      })
    }).rejects.toBeInstanceOf(AccountAlreadyExistsError)
  })
})