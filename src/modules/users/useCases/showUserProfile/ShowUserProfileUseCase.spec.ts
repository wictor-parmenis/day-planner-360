import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository
let showUserProfileUseCase: ShowUserProfileUseCase

describe('ShowUserProfileUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
  })

  it('Should be show user', async () => {
    const user = {
      email: 'wictortec@gmail.com',
      name: 'wictor',
      password: 'password'
    }

    const userCreated = await createUserUseCase.execute({
      email: user.email,
      name: user.name,
      password: user.password
    })

    const response = await showUserProfileUseCase.execute(`${userCreated.id}`)

    expect(response).toEqual(userCreated)
  })

  it('Should be throw error because not find user', async () => {
    await expect(
      async () => {
        await showUserProfileUseCase.execute('wrong-id')
      }
    ).rejects.toBeInstanceOf(AppError)
  })
})


