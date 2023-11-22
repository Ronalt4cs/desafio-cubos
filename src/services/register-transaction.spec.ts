import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterTransactionService } from './register-transaction'
import { FakeTransactionsRepository } from '@/repositories/fakes/fake-transaction-repository'
import { FakeAccountsRepository } from '@/repositories/fakes/fake-accounts-repository'
import { BalanceInsufficientError } from './errors/balance-insufficient-error'

let sut: RegisterTransactionService
let transactionsRepository: FakeTransactionsRepository
let accountsRepository: FakeAccountsRepository

describe('Register transactions service', () => {
  beforeEach(() => {
    transactionsRepository = new FakeTransactionsRepository()
    accountsRepository = new FakeAccountsRepository()
    sut = new RegisterTransactionService(transactionsRepository, accountsRepository)
  })

  it('Should be able to register a transaction using credit for an account', async () => {
    const { id: accountId } = await accountsRepository.create({
      id: 'fakeId',
      branch: '123',
      account: '12345678',
      userId: '123',
    })

    const { transaction } = await sut.execute({
      type: 'credit',
      description: 'describe',
      value: 100,
      accountId
    })

    expect(transaction.id).toEqual(expect.any(String))
    expect(transaction.value).toEqual(100)
  })

  it('Should be able to register a transaction using debit for an account', async () => {
    const { id: accountId } = await accountsRepository.create({
      id: 'fakeId',
      branch: '123',
      account: '12345678',
      userId: '123',
      balance: 10000
    })

    const { transaction } = await sut.execute({
      type: 'debit',
      description: 'describe',
      value: 100,
      accountId
    })

    expect(transaction.id).toEqual(expect.any(String))
    expect(transaction.value).toEqual(100)
  })

  it('Should not be able to register a transaction using debit for an account with insuficcient balance', async () => {
    const { id: accountId } = await accountsRepository.create({
      id: 'fakeId',
      branch: '123',
      account: '12345678',
      userId: '123',
      balance: 100
    })

    expect(async () => {
      await sut.execute({
        type: 'debit',
        description: 'describe',
        value: 100,
        accountId
      })
    }).rejects.toBeInstanceOf(BalanceInsufficientError)
  })
})