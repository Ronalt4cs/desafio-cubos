import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetTransactionByIdServiceRequest {
  transactionId: string
}

interface GetTransactionByIdServiceResponse {
  transaction: Transaction
}

export class GetTransactionByIdService {
  constructor(private transactionsRepository: TransactionsRepository) { }

  async execute({
    transactionId
  }: GetTransactionByIdServiceRequest): Promise<GetTransactionByIdServiceResponse> {

    const transaction = await this.transactionsRepository.getTransactionById(transactionId)

    if (!transaction) {
      throw new ResourceNotFound()
    }

    return { transaction }
  }
}