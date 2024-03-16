import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../entities/User";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository;
let user:User;
const createUserPayload = {
  email: 'wictortec@gmail.com', name: 'Wictor Gomes', password: 'password'
}

jest.mock('../../../../config/auth.ts', () => {
  process.env.JWT_SECRET = 'senhasupersecreta123'
  return {
    jwt: {
      secret: process.env.JWT_SECRET as string,
      expiresIn: '1d'
    }
  }
})

describe('AuthenticateUserUseCase', () => {

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it('Should be create token', async() => {
    const userCreated: ICreateUserDTO = {
      email: 'wictortec@gmail.com',
      name: 'wictor',
      password: 'password'
    }

    await createUserUseCase.execute(userCreated)

    const response = await authenticateUserUseCase.execute({
      email: createUserPayload.email,
      password: createUserPayload.password
    })

    expect(response).toHaveProperty('token')
  })

  it('Should be throw error because not matches password', async() => {
     expect(async() => {
       await authenticateUserUseCase.execute({
         email: user.email,
         password: 'password-wrong'
       })
     }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be throw error because user not exist', async() => {
    expect(async() => {
      await authenticateUserUseCase.execute({
        email: 'wrong@gmail.com',
        password: user.password
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
