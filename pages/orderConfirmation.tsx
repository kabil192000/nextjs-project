import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import FooterNJ from '@/app/components/FooterNJ';

// Define types for order details and product
interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  orderId: string;
  customer_name: string;
  cart: Product[];
  total_amount: number;
}

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Retrieve order details from localStorage
      const storedOrder = localStorage.getItem('orderDetails');
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderDetails(parsedOrder); // If order details are found, set them
        setOrderId(parsedOrder.orderId); // Set orderId from the parsed order
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        {orderDetails ? (
          <>
            <h2 className="text-center mb-4">Order Confirmation</h2>
            <div className="text-center">
              <h4>Thank you for your order, {orderDetails.customer_name}!</h4>
              <p>Your order has been successfully placed. Your Order ID is: <strong>{orderId}</strong></p>
              <h5>Order Details:</h5>
              <ul className="list-group">
                {orderDetails.cart.map((product: Product) => (
                  <li key={product.id} className="list-group-item">
                    {product.name} x {product.quantity} - ${product.price * product.quantity}
                  </li>
                ))}
              </ul>
              <h5>Total: ${orderDetails.total_amount}</h5>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={() => router.push('/profile')}>
                Go to Profile
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3>Order not found</h3>
          </div>
        )}
      </div>
      <FooterNJ />
    </>
  );
};

export default OrderConfirmation;
