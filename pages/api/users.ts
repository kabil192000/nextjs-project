import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../lib/db';

interface User {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  profile_picture_url: string;
  role: string;
  status: string;
  email_verified: boolean;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

import { ResultSetHeader, RowDataPacket } from 'mysql2';


async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      username, email, password, full_name, phone_number, date_of_birth, gender,
      profile_picture_url, role, status, email_verified, address_line, city, state,
      postal_code, country
    }: User = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO mycommerces.users (username, email, password, full_name, phone_number, date_of_birth, gender, profile_picture_url, role, status, email_verified, address_line, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        username, email, hashedPassword, full_name, phone_number, date_of_birth, gender, profile_picture_url, role, status, email_verified,
        address_line, city, state, postal_code, country
      ]
    );

    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
  }
}


async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [users] = await connection.query<RowDataPacket[]>('SELECT * FROM mycommerces.users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
  }
}


async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  try {
    const [user] = await connection.query<RowDataPacket[]>('SELECT * FROM mycommerces.users WHERE id = ?', [id]);
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
  }
}

async function searchUsers(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  try {
    const [users] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM mycommerces.users WHERE username LIKE ? OR email LIKE ? OR full_name LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  try {
    const {
      username, email, full_name, phone_number, date_of_birth, gender,
      profile_picture_url, role, status, email_verified, address_line, city, state,
      postal_code, country
    }: User = req.body;

    const [result] = await connection.query<ResultSetHeader>(
      `UPDATE mycommerces.users SET 
        username = ?, email = ?, full_name = ?, phone_number = ?, date_of_birth = ?, 
        gender = ?, profile_picture_url = ?, role = ?, status = ?, email_verified = ?, 
        address_line = ?, city = ?, state = ?, postal_code = ?, country = ?
       WHERE id = ?`,
      [
        username, email, full_name, phone_number, date_of_birth, gender, profile_picture_url, 
        role, status, email_verified, address_line, city, state, postal_code, country, id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const [result] = await connection.query<ResultSetHeader>('DELETE FROM mycommerces.users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await createUser(req, res);
  } else if (req.method === 'GET') {
    const { id, query } = req.query;
    if (id) {
      await getUserById(req, res);
    } else if (query) {
      await searchUsers(req, res);
    } else {
      await getAllUsers(req, res);
    }
  } else if (req.method === 'PUT') {
    await updateUser(req, res);
  } else if (req.method === 'DELETE') {
    await deleteUser(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
