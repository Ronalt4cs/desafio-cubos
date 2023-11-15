import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/register-user'
import { login } from './controllers/login'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/login', login)
}
