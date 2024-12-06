import { Product } from '../../types/models/product'

export default {
  docs: {
    description: 'Product service description',
    securities: ['all'],
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          code: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          image: { type: 'string' },
          category: { type: 'string' },
          price: { type: 'number' },
          quantity: { type: 'number' },
          internalReference: { type: 'string' },
          shellId: { type: 'number' },
          inventoryStatus: { type: 'string', enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'] },
          rating: { type: 'number' },
          createdAt: { type: 'number' },
          updatedAt: { type: 'number' }
        } as Record<keyof Product, any>
      }
    },
  }
}
