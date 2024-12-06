import { app } from '../src/app'
import request from 'supertest'
import 'should'

describe('Auth API', () => {
  it('should return a token for valid credentials', async () => {
    const credentials = {
      email: 'admin@admin.com',
      password: 'supersecret'
    }

    const response = await request(app as any)
      .post('/token')
      .send(credentials)

    response.status.should.equal(200)
    response.body.should.have.property('accessToken')
  })

  it('should return an error for invalid credentials', async () => {
    const credentials = {
      email: 'admin@admin.com',
      password: 'wrongpassword'
    }

    const response = await request(app as any)
      .post('/token')
      .send(credentials)

    response.status.should.equal(401)
    response.body.should.have.property('error')
  })

  it('should return an error for missing credentials', async () => {
    const response = await request(app as any)
      .post('/token')
      .send({})

    response.status.should.equal(400)
    response.body.should.have.property('error')
  })
})
