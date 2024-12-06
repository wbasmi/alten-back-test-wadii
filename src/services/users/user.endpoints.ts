import { Application } from '../../declarations'
import { Request, Response } from 'express'

const userEndpoints = (app: Application) => {
  app.post('/account', async (req: Request, res: Response) => {
    try {
      const result = await app.service('users').create(req.body);

      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  })
}

export default userEndpoints
