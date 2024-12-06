import { Application } from '../../declarations'
import { Request, Response } from 'express'

const authEndpoints = (app: Application) => {
  app.post('/token', async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    try {
      const result = await app.service('authentication').create({
        strategy: 'local',
        username: email,
        password
      })

      res.json(result)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  })
}

export default authEndpoints
