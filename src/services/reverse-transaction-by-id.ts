import { TransactionsRepository } from '@/repositories/transactions-repository'
import { $Enums, Transaction } from '@prisma/client'
import { TransactionAlreadyReversedError } from './errors/transaction-already-reversed-error'

interface ReverseTransactionByIdServiceRequest {
  transactionId: string
  description: string
  type: $Enums.TransactionType
}

interface ReverseTransactionByIdServiceResponse {
  transaction: Transaction
}

export class ReverseTransactionByIdService {
  constructor(private transactionsRepository: TransactionsRepository) { }

  async execute({
    transactionId,
    description,
    type
  }: ReverseTransactionByIdServiceRequest): Promise<ReverseTransactionByIdServiceResponse> {

    const transaction = await this.transactionsRepository.reverseTransactionById(transactionId, description, type)

    if (!transaction) {
      throw new TransactionAlreadyReversedError()
    }

    return { transaction }
  }
}