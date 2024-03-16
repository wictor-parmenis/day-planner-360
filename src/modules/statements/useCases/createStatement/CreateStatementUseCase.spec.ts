import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../../users/entities/User";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { v4 as uuid } from 'uuid'

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase
const user = {
  email: `wictortec${uuid()}@gmail.com`, name: 'Wictor Gomes', password: 'password', id: uuid()
}
let userCreated: User;

describe('CreateStatementUseCase', () => {

  inMemoryUsersRepository = new InMemoryUsersRepository()
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  inMemoryStatementsRepository = new InMemoryStatementsRepository()
  createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)

  beforeAll(async () => {
    userCreated = await createUserUseCase.execute(user)
  })

  it('Should be create statement', async() => {
    const response = await createStatementUseCase.execute({
      amount: 100,
      description: 'example',
      type: 'deposit' as OperationType,
      user_id: userCreated.id as string
    })

    expect(response).toHaveProperty('id')
  })

  it('Should be throw error because invalid balance', async() => {

    expect (async () => {
      await createStatementUseCase.execute({
        amount: 100,
        description: 'example',
        type: 'deposit' as OperationType,
        user_id: userCreated.id as string
      })

      await createStatementUseCase.execute({
        amount: 120,
        description: 'example',
        type: 'withdraw' as OperationType,
        user_id: userCreated.id as string
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it('Should be throw error because not found user', async () => {
    expect (async () => {
      await createStatementUseCase.execute({
        amount: 100,
        description: 'example',
        type: 'deposit' as OperationType,
        user_id: 'wrong-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})


