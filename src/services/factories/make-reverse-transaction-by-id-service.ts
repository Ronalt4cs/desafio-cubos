import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository"
import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository"
import { ReverseTransactionByIdService } from "../reverse-transaction-by-id"
import { GetAccountBalanceService } from "../get-account-balance"
import { GetTransactionByIdService } from "../get-transaction-by-id"
import { BalanceInsufficientError } from "../errors/balance-insufficient-error"
import { TransactionAlreadyReversedError } from "../errors/transaction-already-reversed-error"
import { UpdateAccountBalanceService } from "../update-account-balance"

interface MakeReverseTransactionByIdServiceRequest {
  accountId: string
  transactionId: string
  description: string
}

export async function makeReverseTransactionByIdService({
  accountId,
  transactionId,
  description
}: MakeReverseTransactionByIdServiceRequest) {

  const accountsRepository = new PrismaAccountsRepository()
  const transactionsRepository = new PrismaTransactionsRepository()
  const getAccountBalanceService = new GetAccountBalanceService(accountsRepository)
  const updateAcountBalance = new UpdateAccountBalanceService(accountsRepository)
  const getTransactionByIdService = new GetTransactionByIdService(transactionsRepository)
  const reverseTransactionByIdService = new ReverseTransactionByIdService(transactionsRepository)

  const { transaction: transactionFound } = await getTransactionByIdService.execute({ transactionId })
  const { balance: accountBalance } = await getAccountBalanceService.execute({ accountId })

  if (accountBalance < transactionFound.value) {
    throw new BalanceInsufficientError()
  }

  if (transactionFound.reversed) {
    throw new TransactionAlreadyReversedError()
  }

  const { transaction: transactionReversed } = await reverseTransactionByIdService.execute({
    transactionId,
    description,
    type: transactionFound.type
  })

  await updateAcountBalance.execute({ accountId, value: transactionReversed.value, type: transactionReversed.type })

  const { accountId: a, reversed: b, ...transaction } = transactionReversed

  return { transaction }
}