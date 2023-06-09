import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    try {
        if (req.query.googleId) {
            const result = await prisma.livros.findFirst({
                where: {
                    googleId: req.query.googleId.toString(),
                }
            });
            prisma.$disconnect();
            res.status(200).json(result);
        } else {
            prisma.$disconnect();
            res.status(400).json({ error: 'GoogleId not found' });
        }
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ error: 'Oops! Something went wrong.' + error });
    }
}