import express from 'express'
import { routes } from './http/routes'

export const app = express()

app.use(express.json())
app.use(routes)