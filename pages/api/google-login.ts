
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('165987205197-6u8mgeo5k609keav3ic4gvv9noi6g4ea.apps.googleusercontent.com'); // Use your Google Client ID here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '165987205197-6u8mgeo5k609keav3ic4gvv9noi6g4ea.apps.googleusercontent.com',  // Verify the token with the Client ID
      });

      const payload = ticket.getPayload();
      console.log('User info:', payload);  

      res.status(200).json({ message: 'Google login successful', user: payload });
    } catch (error) {
      console.error('Google login verification failed:', error);
      res.status(400).json({ error: 'Invalid token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
