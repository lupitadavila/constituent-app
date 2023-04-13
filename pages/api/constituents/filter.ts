import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/constituents/filter?searchString=:searchString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { searchString } = req.query

  const resultConstituents = await prisma.constituent.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          email: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
      ],
    },
  })
  return res.json(resultConstituents)
}