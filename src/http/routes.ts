import { Express } from 'express'
import { registerUser } from './controllers/register-user'
import { authenticate } from './controllers/authenticate'
import { registerAccount } from './controllers/register-account'
import { jwtVerify } from './middleware/jwt-verify'
import { fetchAccountsByUserId } from './controllers/fetch-accounts-by-user-id'
import { registerCard } from './controllers/register-card'

export async function appRoutes(app: Express) {
  app.post('/people', registerUser)
  app.post('/login', authenticate)

  app.use(jwtVerify)
  app.post('/accounts', registerAccount)
  app.get('/accounts', fetchAccountsByUserId)
  app.post('/accounts/:accountId/cards', registerCard)
}
