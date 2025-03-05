import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image_url: string;
  stock_quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET' && !req.query.id) {
    try {
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM mycommerces.products ORDER BY id DESC');
      const products: Product[] = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        category: row.category,
        brand: row.brand,
        image_url: row.image_url,
        stock_quantity: row.stock_quantity,
      }));

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
    }
  }

  
  else if (req.method === 'GET' && req.query.id) {
    try {
      const { id } = req.query;
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM mycommerces.products WHERE id = ?', [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Mobile not found' });
      }

      const product: Product = {
        id: rows[0].id,
        name: rows[0].name,
        description: rows[0].description,
        price: rows[0].price,
        category: rows[0].category,
        brand: rows[0].brand,
        image_url: rows[0].image_url,
        stock_quantity: rows[0].stock_quantity,
      };

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
    }
  }

  
  else if (req.method === 'POST') {
    try {
      const { name, description, price, category, brand, image_url, stock_quantity } = req.body;

      
      const [result] = await connection.query<ResultSetHeader>(
        'INSERT INTO mycommerces.products (name, description, price, category, brand, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [name, description, price, category, brand, image_url, stock_quantity]
      );

      
      const productId = result.insertId;

      res.status(201).json({ message: 'Mobile created successfully', id: productId });
    } catch (error) {
      res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
    }
  }

  
  else if (req.method === 'PUT') {
    try {
      const { id, name, description, price, category, brand, image_url, stock_quantity } = req.body;

      const [existingMobile] = await connection.query<RowDataPacket[]>('SELECT * FROM mycommerces.products WHERE id = ?', [id]);

      if (existingMobile.length === 0) {
        return res.status(404).json({ message: 'Mobile not found' });
      }

      await connection.query(
        'UPDATE mycommerces.products SET name = ?, description = ?, price = ?, category = ?, brand = ?, image_url = ?, stock_quantity = ? WHERE id = ?',
        [name, description, price, category, brand, image_url, stock_quantity, id]
      );

      res.status(200).json({ message: 'Mobile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
    }
  }

  
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      const [existingMobile] = await connection.query<RowDataPacket[]>('SELECT * FROM mycommerces.products WHERE id = ?', [id]);

      if (existingMobile.length === 0) {
        return res.status(404).json({ message: 'Mobile not found' });
      }

      await connection.query('DELETE FROM mycommerces.products WHERE id = ?', [id]);

      res.status(200).json({ message: 'Mobile deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database connection error', details: (error as Error).message });
    }
  }

  
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
