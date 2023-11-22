import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'
import jwt from 'jsonwebtoken'

type JwtPayload = {
  userId: string
}

export async function jwtVerify(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers

  if (!authorization) {

    return response.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const token = authorization.split(' ')[1]

    const { userId } = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return response.status(401).send({ message: 'Unauthorized' })
    }

    const { password: _, ...loggedUser } = user

    request.user = loggedUser

    next()

  } catch (error) {
    return response.status(401).send({ message: 'Unauthorized' })
  }
}