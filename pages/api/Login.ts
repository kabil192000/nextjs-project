
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../../lib/db';


interface User {
  id: number;
  email: string;
  password: string;
  full_name: string;
  role: string;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key'; 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
    
      const [rows]: any[] = await connection.query('SELECT * FROM mycommerces.users WHERE email = ?', [email]);

      
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user: User = rows[0];

      
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

   
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error'});
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
