import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const paypalClientId = process.env.PAYPAL_CLIENT_ID;

  if (!paypalClientId) {
    return res.status(500).json({ error: 'PayPal client ID not found.' });
  }

  return res.status(200).json({ paypalClientId });
}
