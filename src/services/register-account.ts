import { AccountsRepository } from '@/repositories/accounts-repository'
import { InvalidateBranchError } from './errors/invalidate-branch-error'
import { InvalidateAccountNumberError } from './errors/invalidate-account-number-error'
import { ResourceNotFound } from './errors/resource-not-found'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'
import { Account } from '@prisma/client'

interface RegisterAccountServiceRequest {
  branch: string
  account: string
  userId?: string
}

interface RegisterAccountServiceResponse {
  account: Partial<Account>
}
export class RegisterAccountService {
  constructor(private accountsRepository: AccountsRepository) { }

  async execute({
    branch,
    account,
    userId
  }: RegisterAccountServiceRequest): Promise<RegisterAccountServiceResponse> {
    if (!userId) {
      throw new ResourceNotFound()
    }

    if (branch.trim().length !== 3) {
      throw new InvalidateBranchError()
    }

    if (account.trim().length !== 8) {
      throw new InvalidateAccountNumberError()
    }

    const accountFormated = account.replace(/\D/g, '').replace(/(\d{7})(\d+)/, '$1-$2')

    const accountAlreadyExists = await this.accountsRepository.getByAccountNumber(accountFormated)

    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError()
    }

    const accountCreated = await this.accountsRepository.create({
      branch: branch.trim(),
      account: accountFormated,
      userId
    })

    const { balance, userId: _, ...accountResponse } = accountCreated

    return { account: accountResponse }
  }
}