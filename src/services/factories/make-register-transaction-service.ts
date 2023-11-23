import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { RegisterTransactionService } from '../register-transaction'
import { $Enums } from '@prisma/client'
import { BalanceInsufficientError } from '../errors/balance-insufficient-error'
import { GetAccountBalanceService } from '../get-account-balance'

interface MakeRegisterTransactionServiceRequest {
  type: $Enums.TransactionType
  value: number
  description: string
  accountId: string
}

export async function makeRegisterTransactionService({
  type,
  value,
  description,
  accountId,
}: MakeRegisterTransactionServiceRequest) {
  const transactionsRepository = new PrismaTransactionsRepository()
  const accountsRepository = new PrismaAccountsRepository()
  const getAccountBalanceByIdService = new GetAccountBalanceService(accountsRepository)
  const registerTransactionService = new RegisterTransactionService(transactionsRepository)

  const valueInCents = value * 100

  if (type === 'debit') {
    const { balance } = await getAccountBalanceByIdService.execute({ accountId })

    const isBalanceSuficientToTransaction = balance >= value

    if (!isBalanceSuficientToTransaction) {
      throw new BalanceInsufficientError()
    }

    await accountsRepository.updateAcountBalance(accountId, valueInCents, type)
  }

  const { transaction: transactionRegistered } = await registerTransactionService.execute({
    type,
    value,
    description,
    accountId,
  })

  const { accountId: a, reversed: b, ...transaction } = transactionRegistered
  const transactionWithRealValue = { ...transaction, value: value }

  return { transaction: transactionWithRealValue }
}