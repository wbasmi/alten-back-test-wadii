import { app } from '../src/app'
import request from 'supertest'
import 'should'
import { faker } from '@faker-js/faker'

describe('Account API', () => {
  it('should create a new account', async () => {
    const accountData = {
      username: faker.internet.username(),
      firstname: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request(app as any)
      .post('/account')
      .send(accountData)

    response.status.should.equal(201)
    response.body.should.have.property('username', accountData.username)
    response.body.should.have.property('firstname', accountData.firstname)
    response.body.should.have.property('email', accountData.email)
  })
})
