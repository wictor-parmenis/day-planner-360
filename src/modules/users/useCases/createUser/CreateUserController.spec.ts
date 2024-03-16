import supertest from 'supertest'
import { app } from '../../../../app'
import { Connection } from 'typeorm';
import connection from '../../../../database'
import {v4 as uuid} from 'uuid'

let connectionDb:Connection;
let user = {
  name: 'John Doe',
  email: `wictor${uuid()}@gmail.com`,
  password: '123456'
}

describe('CreateUserController', () => {
  beforeAll(async () => {
    connectionDb = await connection();
    await connectionDb.runMigrations();
  })

  afterAll(async () => {
    await connectionDb.dropDatabase();
    await connectionDb.close();
  })

  it('should be create user', async () => {
    const response = await supertest(app).post('/api/v1/users').send({
      email: user.email,
      password: user.password,
      name: user.password
    })

    expect(response.status).toBe(201)
  })

  it('should be throw error because user already exist', async () => {
    const response = await supertest(app).post('/api/v1/users').send({
      email: user.email,
      password: user.password,
      name: user.password
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('User already exists')
  })
})

