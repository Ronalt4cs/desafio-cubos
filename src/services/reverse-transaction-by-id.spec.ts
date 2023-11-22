import { describe, it, expect, beforeEach } from 'vitest'
import { FakeTransactionsRepository } from '@/repositories/fakes/fake-transaction-repository'
import { ReverseTransactionByIdService } from './reverse-transaction-by-id'
import { TransactionAlreadyReversedError } from './errors/transaction-already-reversed-error'

let sut: ReverseTransactionByIdService
let transactionsRepository: FakeTransactionsRepository

describe('Reverse transaction by id service', () => {
  beforeEach(() => {
    transactionsRepository = new FakeTransactionsRepository()
    sut = new ReverseTransactionByIdService(transactionsRepository)
  })

  it('Should be able to reverse an transaction', async () => {
    const { id } = await transactionsRepository.create({
      type: 'credit',
      description: 'describe',
      value: 100,
      accountId: '123'
    })

    const { transaction } = await sut.execute({ transactionId: id, description: 'reverse', type: 'credit' })

    expect(transaction.id).toEqual(expect.any(String))
    expect(transaction.reversed).toEqual(true)
    expect(transaction.description).toEqual('reverse')
    expect(transaction.type).toEqual('debit')
  })

  it('Should not be able to reverse an transaction already reversed', async () => {
    const { id } = await transactionsRepository.create({
      type: 'credit',
      description: 'describe',
      value: 100,
      reversed: true,
      accountId: '123'
    })

    expect(async () => {
      await sut.execute({ transactionId: id, description: 'reverse', type: 'credit' })
    }).rejects.toBeInstanceOf(TransactionAlreadyReversedError)
  })
})