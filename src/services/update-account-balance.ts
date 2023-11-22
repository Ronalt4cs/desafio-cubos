import { AccountsRepository } from '@/repositories/accounts-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { $Enums } from '@prisma/client'

interface UpdateAccountBalanceServiceRequest {
  accountId: string
  value: number
  type: $Enums.TransactionType
}

export class UpdateAccountBalanceService {
  constructor(private accountsRepository: AccountsRepository) { }

  async execute({
    accountId,
    value,
    type
  }: UpdateAccountBalanceServiceRequest) {

    const account = await this.accountsRepository.updateAcountBalance(accountId, value, type)

    if (!account) {
      throw new ResourceNotFound()
    }

    return { account }
  }
}