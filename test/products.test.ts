import { app } from '../src/app'
import request from 'supertest'
import 'should'

const randomId = Math.floor(Math.random() * 10000) + 13242;

describe('Products API', () => {
  let token: string

  before(async () => {
    const response = await request(app as any)
      .post('/token')
      .send({ email: 'admin@admin.com', password: 'supersecret' })


    token = response.body.accessToken
  })

  it('should create a product', async () => {
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

    const response = await request(app as any)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productData)

    response.status.should.equal(201)
    response.body.should.have.property('id', productData.id)
  })

  it('should get a product by id', async () => {
    const response = await request(app as any)
      .get(`/products/${randomId}`)
      .set('Authorization', `Bearer ${token}`)

    response.status.should.equal(200)
    response.body.should.have.property('id', randomId)
  })

  it('should update a product', async () => {
    const updatedData = { name: 'Updated Product 1' }

    const response = await request(app as any)
      .patch(`/products/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)

    response.status.should.equal(200)
    response.body.should.have.property('name', updatedData.name)
  })

  it('should delete a product', async () => {
    const response = await request(app as any)
      .delete(`/products/${randomId}`)
      .set('Authorization', `Bearer ${token}`)

    response.status.should.equal(200)
    response.body.should.have.property('id', randomId)
  })
})
