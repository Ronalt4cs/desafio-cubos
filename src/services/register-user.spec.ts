import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserService } from './register-user'

import { FakeUsersRepository } from '@/repositories/fakes/fake-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InvalidateDocumentError } from './errors/invalidate-document-error'

let usersRepository: FakeUsersRepository
let sut: RegisterUserService

describe('Register user Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })

  it('should be able to register with cpf', async () => {
    const { user } = await sut.execute({
      name: 'fake user',
      document: '569.679.155-76',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to register with cnpj', async () => {
    const { user } = await sut.execute({
      name: 'fake user',
      document: '56.679.155/1234-76',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'fake user',
      document: '569.679.155-76',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with invalid document', async () => {
    expect(async () =>
      await sut.execute({
        name: 'fake user 2',
        document: '569.679.155-1',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidateDocumentError)
  })

  it('should not be able to register with same document twice', async () => {
    const document = '569.679.155-76'

    await sut.execute({
      name: 'fake user',
      document,
      password: '123456',
    })

    expect(async () =>
      await sut.execute({
        name: 'fake user 2',
        document,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
