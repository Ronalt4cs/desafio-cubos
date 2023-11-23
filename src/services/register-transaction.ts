import { TransactionsRepository } from '@/repositories/transactions-repository'
import { $Enums, Transaction } from '@prisma/client'

interface RegisterTransactionServiceRequest {
  type: $Enums.TransactionType
  value: number
  description: string
  accountId: string
}

interface RegisterTransactionServiceResponse {
  transaction: Transaction
}

export class RegisterTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) { }

  async execute({
    type,
    value,
    description,
    accountId,
  }: RegisterTransactionServiceRequest): Promise<RegisterTransactionServiceResponse> {

    const transaction = await this.transactionsRepository.create({
      type,
      value,
      description,
      accountId,
    })

    return { transaction }
  }
}