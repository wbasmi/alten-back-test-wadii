import { app } from '../src/app'
import request from 'supertest'
import 'should'

describe('Products API Access Control', () => {
  it('should return 401 for unauthenticated access to /products', async () => {
    const response = await request(app as any)
      .get('/products')

    response.status.should.equal(401)
    response.body.should.have.property('code').equal(401)
  })

  let adminToken: string
  let userToken: string
  const randomId = Math.floor(Math.random() * 10000) + 13242
  const productData = {
    id: randomId,
    code: 'P001',
    name: `Product ${randomId}`,
    description: 'Description for product',
    image: 'image1.jpg',
    category: 'Category 1',
    price: 100,
    quantity: 10,
    internalReference: `REF00${randomId}`,
    shellId: 1,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }

  before(async () => {
    // Authenticate as admin and get a JWT token
    const adminResponse = await request(app as any)
      .post('/token')
      .send({ email: 'admin@admin.com', password: 'supersecret' })

    adminToken = adminResponse.body.accessToken

    // Authenticate as a regular user and get a JWT token
    const userResponse = await request(app as any)
      .post('/token')
      .send({ email: 'test@example.com', password: 'supersecret' })

    userToken = userResponse.body.accessToken
  })

  it('should allow admin to create a product', async () => {
    const response = await request(app as any)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(productData)

    response.status.should.equal(201)
  })

  it('should deny non-admin user to create a product', async () => {


    const response = await request(app as any)
      .post('/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send(productData)

    response.status.should.equal(403)
  })

  it('should allow admin to update a product', async () => {
    const updatedData = { name: 'Updated Product' }

    const response = await request(app as any)
      .patch(`/products/${randomId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedData)

    response.status.should.equal(200)
  })

  it('should deny non-admin user to update a product', async () => {
    const updatedData = { name: 'Updated Product' }

    const response = await request(app as any)
      .patch(`/products/${randomId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatedData)

    response.status.should.equal(403)
  })

  it('should allow admin to delete a product', async () => {
    const response = await request(app as any)
      .delete(`/products/${randomId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    response.status.should.equal(200)
  })

  it('should deny non-admin user to delete a product', async () => {
    await request(app as any)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(productData)

    const response = await request(app as any)
      .delete(`/products/${randomId}`)
      .set('Authorization', `Bearer ${userToken}`)

    response.status.should.equal(403)
  })
})
