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
const statement = {
    user_id: user.id,
    amount: 100,
    description: 'example',
    type: 'deposit' as OperationType,
    id: uuid(),
    created_at: new Date(),
    updated_at: new Date(),
}

const statement2 = {
    user_id: user.id,
    amount: 50,
    description: 'example 2',
    type: 'withdraw' as OperationType,
    id: uuid(),
    created_at: new Date(),
    updated_at: new Date(),
}

let connectionDb:Connection;
let session;

describe('GetStatementController', () => {

    beforeAll(async () => {
        connectionDb = await connection();
        await connectionDb.runMigrations();
        const passwordHash = await hash(user.password, 8);
        await connectionDb.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [user.id ,user.name, user.email, passwordHash]);
        await connectionDb.query('INSERT INTO statements (id, user_id, description, amount, type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [statement.id ,statement.user_id, statement.description, statement.amount, statement.type, statement.created_at, statement.updated_at]);
        await connectionDb.query('INSERT INTO statements (id, user_id, description, amount, type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [statement2.id ,statement2.user_id, statement2.description, statement2.amount, statement2.type, statement2.created_at, statement2.updated_at]);
        
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

    it('Should be get balance', async () => {
        const response = await supertest(app).get('/api/v1/statements/balance')
        .set('Authorization', `Bearer ${session.body.token}`)
        
        expect(response.status).toBe(200)
        expect(response.body.statement).toHaveLength(2)
        expect(response.body.balance).toBe(50)
    })
    
    it('Should be throw error because not found user', async () => {
        const response = await supertest(app).get('/api/v1/statements/balance')
        .set('Authorization', `Bearer ${session.body.token}e`)
        
        expect(response.status).toBe(401)
        expect(response.body.message).toEqual('JWT invalid token!')
    })

})