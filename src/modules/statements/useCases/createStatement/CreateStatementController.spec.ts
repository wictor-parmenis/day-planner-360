import supertest from "supertest"
import { OperationType } from "../../entities/Statement";
import { app } from '../../../../app'
import { v4 as uuid } from 'uuid'
import { Connection } from "typeorm";
import connection from '../../../../database'
import { hash } from "bcryptjs";

const user = {
    email: `wictortec${uuid()}@gmail.com`, name: 'Wictor Gomes', password: 'password', id: uuid()
  }
let connectionDb:Connection;
let session;

describe('CreateStatementController', () => {

    beforeAll(async () => {
        connectionDb = await connection();
        await connectionDb.runMigrations();
        const passwordHash = await hash(user.password, 8);
        await connectionDb.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [user.id ,user.name, user.email, passwordHash]);  
    })
    
      afterAll(async () => {
        await connectionDb.dropDatabase();
        await connectionDb.close();
      })

    beforeEach(async () => {
        session = await supertest(app).post('/api/v1/sessions').send({
            email: user.email,
            password: user.password,
        })
    })

    it('Should be create statement', async () => {
        const response = await supertest(app).post('/api/v1/statements/deposit')
        .set('Authorization', `Bearer ${session.body.token}`)
        .send({
            amount: 100,
            description: 'example',
            user_id: user.id as string
        })


        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })

    it('Should be throw error because invalid balance', async () => {

        await supertest(app).post('/api/v1/statements/deposit')
        .set('Authorization', `Bearer ${session.body.token}`)
        .send({
            amount: 20,
            description: 'example',
            user_id: user.id as string
        })

        const response = await supertest(app).post('/api/v1/statements/withdraw')
        .set('Authorization', `Bearer ${session.body.token}`)
        .send({
            amount: 1000,
            description: 'example',
            user_id: user.id as string
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toEqual('Insufficient funds')
    })

    it('Should be throw error because not found user', async () => {
        const response = await supertest(app).post('/api/v1/statements/deposit')
        .set('Authorization', `Bearer ${session.body.token}r`)
        .send({
            amount: 100,
            description: 'example',
            type: 'deposit' as OperationType,
            user_id: uuid() as string
        })
        
        expect(response.status).toBe(401)
        expect(response.body.message).toEqual('JWT invalid token!')
    })

})