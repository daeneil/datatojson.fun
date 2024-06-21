import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getToken from '../get-token/route';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      const accessToken = await getToken();

      const paypalResponse = await axios.post(
        'https://api.paypal.com/v2/checkout/orders',
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount.toString(),
              },
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { id: orderId } = paypalResponse.data;

      res.status(200).json({ success: true, orderId });
    } catch (error) {
      console.error('PayPal API error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}