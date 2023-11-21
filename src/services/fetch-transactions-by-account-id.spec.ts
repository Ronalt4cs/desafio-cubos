import { describe, it, expect, beforeEach } from 'vitest'
import { FetchTransactionsByAccountIdService } from './fetch-transactions-by-account-id'
import { FakeTransactionsRepository } from '@/repositories/fakes/fake-transaction-repository'
import { FakeAccountsRepository } from '@/repositories/fakes/fake-accounts-repository'

let sut: FetchTransactionsByAccountIdService
let transactionsRepository: FakeTransactionsRepository
let accountsRepository: FakeAccountsRepository

describe('fetch transaction by account id service', () => {
  beforeEach(async () => {
    transactionsRepository = new FakeTransactionsRepository()
    accountsRepository = new FakeAccountsRepository()
    sut = new FetchTransactionsByAccountIdService(transactionsRepository)

    const { id: accountId } = await accountsRepository.create({
      id: 'accountId',
      branch: '123',
      account: '12345678',
      userId: '123',
      balance: 10000
    })

    await transactionsRepository.create({
      type: 'credit',
      description: 'describe',
      value: 100,
      accountId
    })

    await transactionsRepository.create({
      type: 'debit',
      description: 'any string',
      value: 100,
      accountId
    })
  })

  it('Should be able to fetch transactions for an account', async () => {
    const { transactions, pagination } = await sut.execute({ accountId: 'accountId' })

    expect(transactions).toHaveLength(2)
    expect(pagination.itemsPerPage).toEqual(10)
    expect(pagination.currentPage).toEqual(1)
    expect(pagination.totalCount).toEqual(2)
    expect(pagination.pageCount).toEqual(1)
  })

  it('Should be able to fetch just credit transactions for an account', async () => {
    const { transactions } = await sut.execute({ accountId: 'accountId', type: 'credit' })
    expect(transactions).toHaveLength(1)
  })

  it('Should be able to fetch just debit transactions for an account', async () => {
    const { transactions } = await sut.execute({ accountId: 'accountId', type: 'debit' })
    expect(transactions).toHaveLength(1)
  })

  it('Should be able to fetch transactions for an account by description', async () => {
    const { transactions } = await sut.execute({ accountId: 'accountId', search: 'descri' })
    expect(transactions).toHaveLength(1)
  })

  it('Should be able to fetch an empty array of transactions if account not have transactions', async () => {
    const { id: accountId } = await accountsRepository.create({
      branch: '123',
      account: '12345678',
      userId: '123',
      balance: 10000
    })

    const { transactions } = await sut.execute({ accountId })
    expect(transactions).toHaveLength(0)
  })

  it('Should be able to fetch an empty array of transactions if page not have transactions', async () => {
    const { transactions } = await sut.execute({ accountId: 'accountId', currentPage: 2 })
    expect(transactions).toHaveLength(0)
  })

})