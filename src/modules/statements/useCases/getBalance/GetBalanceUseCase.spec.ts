import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../../users/entities/User";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { v4 as uuid } from 'uuid'

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository:InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase
let getBalanceUseCase: GetBalanceUseCase

const user = {
  email: `wictortec${uuid()}@gmail.com`, name: 'Wictor Gomes', password: 'password', id: uuid()
}
let userCreated: User;

describe('GetBalanceUseCase', () => {

  inMemoryUsersRepository = new InMemoryUsersRepository()
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  inMemoryStatementsRepository = new InMemoryStatementsRepository()
  createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
  getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository,inMemoryUsersRepository)

  it('Should be get user balance', async() => {

    userCreated = await createUserUseCase.execute(user)
    await createStatementUseCase.execute({
      amount: 100,
      description: 'example',
      type: 'deposit' as OperationType,
      user_id: userCreated.id as string
    })

    const response = await getBalanceUseCase.execute({user_id: userCreated.id as string})
    const {statement} = response;
    const [userStatement] = statement;
    expect(userStatement).toHaveProperty('id')
  })

  it('Should be throw error because not found user', async () => {
    expect (async () => {
      await getBalanceUseCase.execute({
        user_id: 'wrong-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})


