import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserService } from './register-user'

import { FakeUsersRepository } from '@/repositories/fakes/fake-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: FakeUsersRepository
let sut: RegisterUserService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'fake user',
      email: 'fake@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'fake user',
      email: 'fake@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'fake@email.com'

    await sut.execute({
      name: 'fake user',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'fake user 2',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
