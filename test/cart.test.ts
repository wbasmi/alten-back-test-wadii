import { app } from '../src/app'
import request from 'supertest'
import 'should'
import { faker } from '@faker-js/faker'

const randomId = faker.number.int();

const server = request(app as any)

describe('Carts API', () => {
  let token: string
  let cartId: string
  let productId: string
  let userId: string

  before(async () => {
    const response = await server
      .post('/token')
      .send({ email: 'admin@admin.com', password: 'supersecret' })

    token = response.body.accessToken
    userId = response.body.user._id

    const productResponse = await server
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: randomId,
        code: randomId,
        name: `Product ${faker.number.int()}`,
        description: 'Description for product',
        image: 'image1.jpg',
        category: 'Category 1',
        price: 100,
        quantity: 10,
        internalReference: `REF00${faker.number.int()}`,
        shellId: 1,
        inventoryStatus: 'INSTOCK',
        rating: 5
      })

    productId = productResponse.body._id

    const cartResponse = await server
      .post('/carts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: userId,
        items: []
      })

    cartId = cartResponse.body._id
  })

  it('should add a product to the cart', async () => {
    const response = await server
      .post('/cart/add-product')
      .set('Authorization', `Bearer ${token}`)
      .send({ cartId, productId })

    response.status.should.equal(200)
    response.body.items.should.containEql({ product: productId, quantity: 1 })
  })

  it('should update the product quantity in the cart', async () => {
    const response = await server
      .post('/cart/update-product-quantity')
      .set('Authorization', `Bearer ${token}`)
      .send({ cartId, productId, quantity: 5 })

    response.status.should.equal(200)
    response.body.items.should.containEql({ product: productId, quantity: 5 })
  })

  it('should remove a product from the cart', async () => {
    const response = await server
      .post('/cart/remove-product')
      .set('Authorization', `Bearer ${token}`)
      .send({ cartId, productId })

    response.status.should.equal(200)
    response.body.items.should.not.containEql({ product: productId })
  })

  it('should clear the cart', async () => {
    const response = await server
      .post('/cart/clear-cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ cartId })

    response.status.should.equal(200)
    response.body.items.should.be.empty()
  })
})
