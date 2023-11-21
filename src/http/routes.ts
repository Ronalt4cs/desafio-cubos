import { Express } from 'express'
import { registerUser } from './controllers/register-user'
import { authenticate } from './controllers/authenticate'
import { registerAccount } from './controllers/register-account'
import { jwtVerify } from './middleware/jwt-verify'
import { fetchAccountsByUserId } from './controllers/fetch-accounts-by-user-id'
import { registerCard } from './controllers/register-card'
import { fetchCardsByAccountId } from './controllers/fetch-cards-by-account-id'
import { fetchCardsByUserId } from './controllers/fetch-cards-by-user-id'
import { registerTransaction } from './controllers/register-transactions'
import { fetchTransactionsByAccountId } from './controllers/fetch-transactions-by-account-id'
import { getAccountBalanceById } from './controllers/get-account-balance'

export async function appRoutes(app: Express) {
  app.post('/people', registerUser)
  app.post('/login', authenticate)

  app.use(jwtVerify)
  app.post('/accounts', registerAccount)
  app.get('/accounts', fetchAccountsByUserId)
  app.post('/accounts/:accountId/cards', registerCard)
  app.get('/accounts/:accountId/cards', fetchCardsByAccountId)
  app.get('/accounts/cards', fetchCardsByUserId)
  app.post('/accounts/:accountId/transactions', registerTransaction)
  app.get('/accounts/:accountId/transactions', fetchTransactionsByAccountId)
  app.get('/accounts/:accountId/balance', getAccountBalanceById)
}
