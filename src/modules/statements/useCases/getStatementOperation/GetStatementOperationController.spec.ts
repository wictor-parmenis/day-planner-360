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

let connectionDb:Connection;
let session;

describe('GetStatementOperationController', () => {

    beforeAll(async () => {
        connectionDb = await connection();
        await connectionDb.runMigrations();
        const passwordHash = await hash(user.password, 8);
        await connectionDb.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [user.id ,user.name, user.email, passwordHash]);
        await connectionDb.query('INSERT INTO statements (id, user_id, description, amount, type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [statement.id ,statement.user_id, statement.description, statement.amount, statement.type, statement.created_at, statement.updated_at]);        
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

    it('Should be get statement', async () => {
        const response = await supertest(app).get(`/api/v1/statements/${statement.id}`)
        .set('Authorization', `Bearer ${session.body.token}`)
        
        expect(response.status).toBe(200)

        const newStatement = {
            created_at: statement.created_at.toISOString(),
            description: statement.description,
            id: statement.id,
            type: statement.type,
            updated_at: statement.updated_at.toISOString(),
            user_id: statement.user_id,
            amount: `${statement.amount.toFixed(2)}`
        }
        

        expect(response.body).toEqual(newStatement)
    })

    it('Should be throw error because not found statement', async () => {
        const response = await supertest(app).get(`/api/v1/statements/${uuid()}`)
        .set('Authorization', `Bearer ${session.body.token}`)
        
        expect(response.status).toBe(404)
        expect(response.body.message).toEqual('Statement not found')
    })
    
    it('Should be throw error because not found user', async () => {
        const response = await supertest(app).get(`/api/v1/statements/${statement.id}`)
        .set('Authorization', `Bearer ${session.body.token}e`)
        
        expect(response.status).toBe(401)
        expect(response.body.message).toEqual('JWT invalid token!')
    })

})