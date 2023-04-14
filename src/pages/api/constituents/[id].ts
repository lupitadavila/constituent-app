
import prisma from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const { query, method, body } = req;
    const constituentId = query.id as string;

    if (query.id === undefined) {
        return res.status(404).json({
            message: "Not Found"
        });
    }
  
    try{
        switch (method) {
            case "DELETE":
                return handleDELETE(constituentId, res);
            case "PUT":
                return handlePUT(constituentId, body, res);
            case "GET":
                return handleGET(constituentId, res);
            default:
                throw new Error(
                    `The HTTP ${req.method} method is not supported at this route.`,
                    )
        }
    } catch(err) {
      let message;
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          message = "There is a unique constraint violation, a new user cannot be created with this email";
        }
      } else {
        message = "Unable to create user"
      }
      return res.status(500).json({ message });
    }
}

// GET /api/constituents/:id
async function handleGET(constituentId: string, res: NextApiResponse<any>) {
    const constituent = await prisma.constituent.findUnique({
      where: { id: constituentId },
      include: {
        traits: true,
      },
    })

    if (constituent !== null) {
        return res.status(200).json(constituent);
    } else {
        return res.status(404).json({ message: "Not found" });
    }
}

// DELETE /api/constituents/:id
async function handleDELETE(constituentId: string, res: NextApiResponse<any>) {
    const constituent = await prisma.constituent.delete({
      where: { id: constituentId },
    })
    return res.json(constituent);
}

// PUT /api/constituents/:id
async function handlePUT(constituentId: string, data: any, res: NextApiResponse<any>) {
    if (data === undefined) {
        return res.status(400).json({ message: "Nothing to update" });
    }
    const constituent = await prisma.constituent.update({
      where: { id: constituentId },
      data: data
    })
    return res.json(constituent);
}