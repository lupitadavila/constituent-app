import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { parseConstituents } from '@/src/helpers/parse';

// GET /api/constituents?q=:searchString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { q: searchString} = req.query
  let results;

  if (searchString == undefined) {
    results = await prisma.constituent.findMany();
  } else {
    results = await prisma.constituent.findMany({
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
          {
            lastName: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
        ],
      },
      include: {
        traits: true,
      },
    });
  }

  return res.json(parseConstituents(results))
}
