import { RegisterUserService } from '@/services/register-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterUserService() {
  const usersRepository = new PrismaUsersRepository()
  const maseRegisterUserService = new RegisterUserService(usersRepository)

  return maseRegisterUserService
}
