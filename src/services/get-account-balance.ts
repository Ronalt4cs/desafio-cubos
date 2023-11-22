import { AccountsRepository } from '@/repositories/accounts-repository'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetAccountBalanceServiceRequest {
  accountId: string
}

interface GetAccountBalanceServiceResponse {
  balance: number
}

export class GetAccountBalanceService {
  constructor(private accountsRepository: AccountsRepository) { }

  async execute({
    accountId
  }: GetAccountBalanceServiceRequest): Promise<GetAccountBalanceServiceResponse> {

    const balanceInCents = await this.accountsRepository.getAccountBalanceById(accountId)

    if (!balanceInCents) {
      throw new ResourceNotFound()
    }

    const balance = balanceInCents / 100

    return { balance }
  }
}