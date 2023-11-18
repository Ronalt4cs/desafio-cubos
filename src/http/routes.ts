import { Express } from 'express'
import { registerUser } from './controllers/register-user'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: Express) {
  app.post('/users', registerUser)
  app.post('/login', authenticate)
}
