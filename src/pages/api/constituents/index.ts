import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { ConstituentProps } from '../../../interfaces';

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
    });
  }
  

  return res.json(results.map((constituent: any) => ({
    ...constituent,
    createdAt: constituent.createdAt.toISOString(),
    updatedAt: constituent.updatedAt.toISOString(),
  } as unknown as ConstituentProps)))
}