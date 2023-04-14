import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client';

// POST /api/constituent/create
// Required fields in body
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;

  try{
    const constituent = await prisma.constituent.create({
      data: {
        ...body,
        traits: {
          create: body.traits
        }
      },
      include: {
        traits: true,
      },
    });
    return res.status(201).json(constituent)
  } catch(err) {
    debugger;
    let message;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        message = "There is a unique constraint violation, a new user cannot be created with this email";
      }
    } else {
      message = "Unable to create user";
    }
    return res.status(500).json({ message, err });
  }
}