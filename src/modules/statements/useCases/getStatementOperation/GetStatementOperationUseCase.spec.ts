import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../../users/entities/User";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { v4 as uuid } from 'uuid'

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase
let getStatementOperationUseCase: GetStatementOperationUseCase

const user = {
  email: `wictortec${uuid()}@gmail.com`, name: 'Wictor Gomes', password: 'password', id: uuid()
}
let userCreated: User;

describe('GetStatementOperationUseCase', () => {

  inMemoryUsersRepository = new InMemoryUsersRepository()
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  inMemoryStatementsRepository = new InMemoryStatementsRepository()
  createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
  getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)

  beforeAll(async () => {
        userCreated = await createUserUseCase.execute(user)
  })

  it('Should be get user statement', async() => {

    const statement = await createStatementUseCase.execute({
      amount: 100,
      description: 'example',
      type: 'deposit' as OperationType,
      user_id: userCreated.id as string
    })

    const response = await getStatementOperationUseCase.execute({
      user_id: userCreated.id as string, 
      statement_id: statement.id as string
    })

    expect(response).toHaveProperty('id')
  })

  it('Should be throw error because not found user', async () => {
    expect (async () => {

      await getStatementOperationUseCase.execute({
        user_id: 'wrong-id', statement_id: 'wrong-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be throw error because not found statement', async () => {
    expect (async () => {
      await getStatementOperationUseCase.execute({
        user_id: userCreated.id as string, statement_id: 'wrong-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})


