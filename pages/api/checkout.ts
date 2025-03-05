// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe('your-secret-stripe-key', {
  apiVersion: '2025-02-24.acacia',
});

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any email service you prefer
  auth: {
    user: 'kabilk12345@gmail.com',
    pass: 'Kabil@2000',
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { token, shippingInfo, paymentMethod } = req.body;

      // Create the charge with Stripe
      const charge = await stripe.charges.create({
        amount: 1000, // Amount in cents (example: $10)
        currency: 'usd',
        source: token,
        description: 'Test payment',
      });

      // Send an email with the order details
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'kabilk12345@gmail.com',  // Your email
        subject: 'New Order Received',
        text: `
          New order received:
          Name: ${shippingInfo.name}
          Address: ${shippingInfo.address}
          City: ${shippingInfo.city}
          Postal Code: ${shippingInfo.postalCode}
          Country: ${shippingInfo.country}

          Payment Method: ${paymentMethod}
        `,
      };

      await transporter.sendMail(mailOptions);

      // Respond with success
      res.status(200).json({ success: true, charge });
      
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
};

export default handler;
