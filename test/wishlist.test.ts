import { app } from '../src/app'
import request from 'supertest'
import 'should'
import { faker } from '@faker-js/faker'

const randomId = faker.number.int();

const server = request(app as any)

describe('Wishlists API', () => {
  let token: string
  let wishlistId: string
  let productId: string
  let userId: string

  before(async () => {
    // Authenticate and get a JWT token
    const response = await server
      .post('/token')
      .send({ email: 'admin@admin.com', password: 'supersecret' })

    token = response.body.accessToken
    userId = response.body.user._id

    const productResponse = await request(app as any)
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

    const wishlistResponse = await request(app as any)
      .get('/wishlists')
      .set('Authorization', `Bearer ${token}`)
      .query({
        user: userId,
      })

    wishlistId = wishlistResponse.body[0]._id
  })

  it('should add a product to the wishlist', async () => {
    const response = await server
      .post('/wishlist/add-product')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ wishlistId, productId })

    response.status.should.equal(200)
    response.body.products.should.containEql({ product: productId })
  })

  it('should remove a product from the wishlist', async () => {
    const response = await server
      .post('/wishlist/remove-product')
      .set('Authorization', `Bearer ${token}`)
      .send({ wishlistId, productId })

    response.status.should.equal(200)
    response.body.products.should.not.containEql({ product: productId })
  })
})
