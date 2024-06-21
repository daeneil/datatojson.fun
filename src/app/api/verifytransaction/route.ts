import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { orderID } = req.body;

  const response = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    return res.status(500).json({ message: "Error verifying transaction" });
  }

  const order = await response.json();

  // Perform further validation and processing here

  res.status(200).json({ order });
};

export default handler;
