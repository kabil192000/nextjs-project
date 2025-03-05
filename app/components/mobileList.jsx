import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';


function MobileList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/mobiles');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className='home-cord-container' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <Card style={{ width: '18rem', margin: '1rem' }} key={product.id}>
            
            <Card.Img variant="top" src={`/Image/${product.image_url}`} alt={product.name} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              
              <Link href={`/productsMobile/${product.id}`} passHref>
                <Button variant="primary">Go to Product</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MobileList;
