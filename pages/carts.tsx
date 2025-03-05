import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import FooterNJ from '@/app/components/FooterNJ';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  stock_quantity: number;
  image_url: string;
  quantity: number;
}

export default function Carts() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout');
    console.log("usrr");
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <h3>Your cart is empty</h3>
          <button className="btn btn-primary" onClick={() => router.push('/')}>
            Go Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Your Cart</h2>

        <div className="row">
          {cart.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.price}</p>

                  <div className="d-flex align-items-center mb-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        handleQuantityChange(product.id, Math.max(1, product.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          Math.min(product.stock_quantity, product.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="card-text">Total: ${product.price * product.quantity}</p>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <h3>Total Amount: ${calculateTotalAmount()}</h3>
          <button className="btn btn-success w-100" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
        
      </div>
      <FooterNJ />
    </>
  );
}
