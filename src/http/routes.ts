import express from 'express'
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
import { reverseTransactionById } from './controllers/reverse-transaction-by-id'

export const routes = express()

routes.post('/people', registerUser)
routes.post('/login', authenticate)

routes.use(jwtVerify)
routes.post('/accounts', registerAccount)
routes.get('/accounts', fetchAccountsByUserId)
routes.post('/accounts/:accountId/cards', registerCard)
routes.get('/accounts/:accountId/cards', fetchCardsByAccountId)
routes.get('/accounts/cards', fetchCardsByUserId)
routes.post('/accounts/:accountId/transactions', registerTransaction)
routes.get('/accounts/:accountId/transactions', fetchTransactionsByAccountId)
routes.get('/accounts/:accountId/balance', getAccountBalanceById)
routes.post('/accounts/:accountId/transactions/:transactionId/revert', reverseTransactionById)
