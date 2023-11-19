import { AccountsRepository } from '@/repositories/accounts-repository'
import { InvalidateBranchError } from './errors/invalidate-branch-error'
import { InvalidateAccountNumberError } from './errors/invalidate-account-number-error'

interface RegisterAccountServiceRequest {
  branch: string
  account: string
  userId: string
}

export class RegisterAccountService {
  constructor(private accountsRepository: AccountsRepository) { }

  async execute({
    branch,
    account,
    userId
  }: RegisterAccountServiceRequest) {

    if (branch.trim().length !== 3) {
      throw new InvalidateBranchError()
    }

    if (account.trim().length !== 8) {
      throw new InvalidateAccountNumberError()
    }

    const accountFormated = account.replace(/\D/g, '').replace(/(\d{7})(\d+)/, '$1-$2')

    const accountCreated = await this.accountsRepository.create({
      branch: branch.trim(),
      account: accountFormated,
      userId
    })

    return accountCreated
  }
}