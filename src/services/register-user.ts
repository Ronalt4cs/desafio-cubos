import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import { validateDocument } from '@/utils/validate-documents'
import { InvalidateDocumentError } from './errors/invalidate-document-error'

interface RegisterUserServiceRequest {
  name: string
  document: string
  password: string
}

interface RegisterUserServiceResponse {
  user: User
}
export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    document,
    name,
    password,
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const passwordHash = await hash(password, 6)

    const isDocumentValid = validateDocument(document)

    if (!isDocumentValid) {
      throw new InvalidateDocumentError()
    }

    const documentWithoutFormatting = document.replace(/\D/g, '')

    const userWithSamedocument = await this.usersRepository.getByDocument(documentWithoutFormatting)

    if (userWithSamedocument) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      document: documentWithoutFormatting,
      password: passwordHash,
    })

    return {
      user,
    }
  }
}
