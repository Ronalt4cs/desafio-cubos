import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { $Enums, Transaction } from '@prisma/client'
import { BalanceInsufficientError } from './errors/balance-insufficient-error'

interface RegisterTransactionServiceRequest {
  type: $Enums.TransactionType
  value: number
  description: string
  accountId: string
}

interface RegisterTransactionServiceResponse {
  transaction: Partial<Transaction>
}

export class RegisterTransactionService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository
  ) { }

  async execute({
    type,
    value,
    description,
    accountId,
  }: RegisterTransactionServiceRequest): Promise<RegisterTransactionServiceResponse> {

    const valueInCents = value * 100

    if (type === 'debit') {
      const accountBalance = await this.accountsRepository.getAccountBalanceById(accountId)

      const isBalanceSuficientToTransaction = accountBalance && (accountBalance / 100) >= value

      if (!isBalanceSuficientToTransaction) {
        throw new BalanceInsufficientError()
      }

      await this.accountsRepository.discountDebitTransactions(accountId, valueInCents)
    }

    const transactionRegistered = await this.transactionsRepository.create({
      type,
      value: valueInCents,
      description,
      accountId,
    })

    const { accountId: a, reversed: b, ...transaction } = transactionRegistered
    const transactionWithValue = { ...transaction, value: value }

    return { transaction: transactionWithValue }
  }
}