import { describe, it, expect, beforeEach } from 'vitest'
import { GetTransactionByIdService } from './get-transaction-by-id'
import { FakeTransactionsRepository } from '@/repositories/fakes/fake-transaction-repository'
import { ResourceNotFound } from './errors/resource-not-found'

let sut: GetTransactionByIdService
let transactionsRepository: FakeTransactionsRepository

describe('Get transactions by id service', () => {
  beforeEach(() => {
    transactionsRepository = new FakeTransactionsRepository()
    sut = new GetTransactionByIdService(transactionsRepository)
  })

  it('Should be able to get transaction by id', async () => {
    const { id } = await transactionsRepository.create({
      type: 'credit',
      description: 'describe',
      value: 100,
      accountId: '123'
    })

    const { transaction } = await sut.execute({ transactionId: id })
    expect(transaction.id).toEqual(expect.any(String))
  })

  it('Should not be able to get transaction by id if not found', async () => {
    expect(async () => {
      await sut.execute({ transactionId: 'id' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})