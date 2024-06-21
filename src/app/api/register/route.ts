// pages/api/report.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ReportData = {
  area: string;
  severity: number;
  subject: string;
  description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { area, severity, subject, description }: ReportData = req.body;

    try {
      const report = await prisma.report.create({
        data: {
          area,
          severity: Number(severity),
          subject,
          description,
        },
      });
      res.statusCode = 201;
      res.json(report);
    } catch (error) {
      console.error('Prisma error:', error); // Log the error
      res.statusCode = 500;
      res.json({ error: 'Internal Server Error' });
    }
    
  } else {
    res.setHeader('Allow', ['POST']);
    res.statusCode = 405;
    res.end(`Method ${req.method} Not Allowed`);
  }
}
