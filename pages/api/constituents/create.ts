import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/constituent
// Required fields in body
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.constituent.create({
    data: {
      ...req.body,
    },
  })
  return res.status(201).json(result)
}