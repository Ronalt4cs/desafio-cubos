import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidateCredentialsError } from './errors/invalidate-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateServiceRequest {
  document: string
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    document,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.getByDocument(document)

    if (!user) {
      throw new InvalidateCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidateCredentialsError()
    }

    return { user }
  }
}
