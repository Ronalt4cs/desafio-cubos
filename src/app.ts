import express, { Response } from 'express'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'

export const app = express()

app.use(appRoutes)

app.use((error: any, response: Response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  return response.status(500).send({ message: 'Internal server error.' })
})