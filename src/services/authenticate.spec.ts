import { describe, expect, it, beforeEach } from 'vitest'
import { FakeUsersRepository } from '@/repositories/fakes/fake-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidateCredentialsError } from './errors/invalidate-credentials-error'
import { hash } from 'bcryptjs'

let usersRepository: FakeUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'fake.user',
      document: '56967915576',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      document: '56967915576',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate  with document invalid', async () => {
    await expect(() =>
      sut.execute({
        document: '569.679.155-76',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidateCredentialsError)
  })

  it('should not be able to authenticate with password invalid', async () => {
    await usersRepository.create({
      name: 'fake.user',
      document: '56967915576',
      password: await hash('123457', 6),
    })

    await expect(() =>
      sut.execute({
        document: '56967915576',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidateCredentialsError)
  })
})
