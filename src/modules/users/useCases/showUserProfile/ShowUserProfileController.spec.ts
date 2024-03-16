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

describe('ShowUserProfileController', () => {
  beforeAll(async () => {
    connectionDb = await connection();
    await connectionDb.runMigrations();
    const passwordHash = await hash(user.password, 8);
    await connectionDb.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [uuid() ,user.name, user.email, passwordHash]);
  })

  afterAll(async () => {
    await connectionDb.dropDatabase();
    await connectionDb.close();
  })

  it('should be show user', async () => {

    const session = await supertest(app).post('/api/v1/sessions').send({
      email: user.email,
      password: user.password,
    })

    const response = await supertest(app).get('/api/v1/profile').set('Authorization', `Bearer ${session.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
  })

  it('should be not show user because user not found', async () => {
    const session = await supertest(app).post('/api/v1/sessions').send({
        email: user.email,
        password: user.password,
      })

    const response = await supertest(app).get('/api/v1/profile').set('Authorization', `Bearer ${session.body.token}1`)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('JWT invalid token!')
  })
})

