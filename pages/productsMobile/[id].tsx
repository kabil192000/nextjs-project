

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../app/components/Header';

import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import FooterNJ from '@/app/components/FooterNJ';
const apiUrl = '/api/mobiles';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  stock_quantity: number;
  image_url: string;
}

interface Error {
  message: string;
}

export default function ProductsMobile() {
  const [mobiles, setMobiles] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const data: Product[] = await res.json();
      setMobiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch mobiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/mobiles?id=${id}`);
          if (!res.ok) {
            throw new Error('Product not found');
          }
          const data: Product = await res.json();
          setProduct(data);
        } catch (err: any) {
          setError(err.message);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    router.push('/carts');
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  const filteredMobiles = mobiles.filter((mobile) =>
    searchQuery
      ? mobile.name.toLowerCase().includes(searchQuery.toLowerCase())
      : product?.category === mobile.category && product.id !== mobile.id
  );

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img src={product.image_url} alt={product.name} className="card-img-top" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h1 className="card-title"><b>{product.name}</b></h1>
              <p className="card-text">{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock_quantity} available</p>
              <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div className='index-container-products'>
        <div className="row">
          {filteredMobiles.map((mobile) => (
            <div key={mobile.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card">
                <img
                  src={mobile.image_url}
                  alt={mobile.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{mobile.name}</h5>
                  <p className="card-text">Price: ${mobile.price}</p>

                  <Link href={`/productsMobile/${mobile.id}`} passHref>
                    <Button variant="primary">Go to Product</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterNJ />
    </>
  );
}

