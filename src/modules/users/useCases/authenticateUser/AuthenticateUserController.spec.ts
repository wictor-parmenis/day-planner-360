import supertest from 'supertest'
import { app } from '../../../../app'
import { Connection } from 'typeorm';
import connection from '../../../../database'
import {v4 as uuid} from 'uuid'
import { hash } from 'bcryptjs';

let connectionDb:Connection;
let user = {
  name: 'John Doe',
  email: `wictor${uuid()}@gmail.com`,
  password: '123456'
}

describe('AuthenticateUserController', () => {
  beforeAll(async () => {
    connectionDb = await connection();
    await connectionDb.runMigrations();
  })

  afterAll(async () => {
    await connectionDb.dropDatabase();
    await connectionDb.close();
  })
  
  it('should be create authorization token', async () => {
    const passwordHash = await hash(user.password, 8);
    await connectionDb.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [uuid() ,user.name, user.email, passwordHash]);

    const response = await supertest(app).post('/api/v1/sessions').send({
      email: user.email,
      password: user.password
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should be throw error because user not exist', async () => {
    const response = await supertest(app).post('/api/v1/sessions').send({
      email: 'wrongwmail',
      password: user.password
    })

    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Incorrect email or password')
  })

  it('should be throw error because passwords not match', async () => {
    const response = await supertest(app).post('/api/v1/sessions').send({
      email: user.email,
      password: 'wrong-password'
    })
    
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Incorrect email or password')
  })
})

