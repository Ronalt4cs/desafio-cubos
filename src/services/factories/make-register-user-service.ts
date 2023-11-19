import { RegisterUserService } from '@/services/register-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterUserService() {
  const usersRepository = new PrismaUsersRepository()
  const makeRegisterUserService = new RegisterUserService(usersRepository)

  return makeRegisterUserService
}
