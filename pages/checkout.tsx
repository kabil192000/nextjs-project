import React, { useState } from 'react'; 
import { useRouter } from 'next/router';
import emailjs from 'emailjs-com';
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

const Checkout = () => {
  const [cart, setCart] = useState<Product[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const calculateTotalAmount = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetails = {
      orderId: 'order-' + new Date().getTime(), 
      customer_name: name,
      cart: cart,
      total_amount: calculateTotalAmount(),
    };

    
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    
    const orderSummary = cart
      .map((product) => `${product.name} x ${product.quantity} - $${product.price * product.quantity}`)
      .join('\n');

    emailjs
      .send(
        'service_bqdhx72', 
        'template_y9jz5kx', 
        {
          customer_name: name,
          customer_email: email,
          customer_address: address,
          payment_method: paymentMethod,
          order_details: orderSummary,
          total_amount: calculateTotalAmount(),
        },
        'QKbCqamLB2V5Wfjas' 
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
          setSuccessMessage('Order has been successfully placed and a confirmation email has been sent!');
          setTimeout(() => {
            router.push('/orderConfirmation'); 
            localStorage.removeItem('cart'); 
          }, 2000);
        },
        (error) => {
          console.error('Error sending email:', error);
          alert('Failed to send email confirmation.');
        }
      );
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
        <h2 className="text-center mb-4">Checkout</h2>

        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        <div className="row">
          <div className="col-12 col-md-8">
            <h4>Billing Information</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Shipping Address</label>
                <textarea
                  id="address"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="payment" className="form-label">Payment Method</label>
                <select
                  id="payment"
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="mt-4">
                <h4>Order Summary</h4>
                <ul className="list-group mb-4">
                  {cart.map((product) => (
                    <li key={product.id} className="list-group-item">
                      {product.name} x {product.quantity} - ${product.price * product.quantity}
                    </li>
                  ))}
                </ul>
                <h5>Total Amount: ${calculateTotalAmount()}</h5>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Place Order
              </button>
            </form>
          </div>
          <div className="col-12 col-md-4">
            <h4>Order Summary</h4>
            <ul className="list-group mb-4">
              {cart.map((product) => (
                <li key={product.id} className="list-group-item">
                  {product.name} x {product.quantity} - ${product.price * product.quantity}
                </li>
              ))}
            </ul>
            <h5>Total Amount: ${calculateTotalAmount()}</h5>
          </div>
        </div>
      </div>
      <FooterNJ />
    </>
  );
};

export default Checkout;
