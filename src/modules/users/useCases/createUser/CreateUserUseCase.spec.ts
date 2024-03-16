import 'reflect-metadata'
import {CreateUserUseCase} from './CreateUserUseCase'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { AppError } from '../../../../shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('Should be create user', async () => {
      const response = await createUserUseCase.execute({
        email: 'wictortec@gmail.com', name: 'Wictor Gomes', password: 'password'
      })

      expect(response).toHaveProperty('id')
  })

  it('Should be throw error in create user because user already exist', async () => {
    const user = {
      email: 'wictortec@gmail.com', name: 'Wictor Gomes', password: 'password'
    }
    expect (async () => {
      await createUserUseCase.execute(user)
      await createUserUseCase.execute(user)
    })
    .rejects.toBeInstanceOf(AppError)

  })
})
