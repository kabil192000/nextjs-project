import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Header from '../app/components/Header';
import { Button, Pagination } from 'react-bootstrap';
import Link from 'next/link';
import FooterNJ from '@/app/components/FooterNJ';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const apiUrl = '/api/mobiles';

interface Mobile {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating: number; // New rating property
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }
  return <div className="star-rating">{stars}</div>;
};

const Index = () => {
  const [mobiles, setMobiles] = useState<Mobile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 4;

  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const data: Mobile[] = await res.json();
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

  const filteredMobiles = mobiles.filter((mobile) =>
    mobile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredMobiles.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredMobiles.length / productsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <Header />
      <div className='home-container'>
        <Carousel>
          <Carousel.Item>
            <Image
              src="/Image/3214-0-792-1736-8416-6312-1132.png"
              alt="First slide"
              width={1550}
              height={600}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image
              src="/Image/ai-generative-e-commerce-concept-shopping-cart-with-boxes-on-a-wooden-table-photo.jpg"
              alt="Second slide"
              width={1550}
              height={600}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image
              src="/Image/960x0.webp"
              alt="Third slide"
              width={1550}
              height={600}
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className='index-container-products'>
        <div className="row">
          {currentProducts.map((mobile) => (
            <div key={mobile.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div className="row g-0 align-items-center">
                  <div className="col-4">
                    <Link href={`/productsMobile/${mobile.id}`} passHref>
                      <img
                        src={mobile.image_url}
                        alt={mobile.name}
                        className="img-fluid"
                        style={{ height: '130px', objectFit: 'cover', cursor: 'pointer' }}
                      />
                    </Link>
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">{mobile.name}</h5>
                      <p className="card-text">Price: ${mobile.price}</p>
                      <StarRating rating={mobile.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <div className='index-container-products1'>
        <Carousel indicators={false} controls={true}>
          {Array.from({ length: Math.ceil(filteredMobiles.length / 6) }).map((_, index) => (
            <Carousel.Item key={index}>
              <div className="row">
                {filteredMobiles.slice(index * 6, index * 6 + 6).map((mobile) => (
                  <div key={mobile.id} className="col-6 col-md-2 mb-4">
                    <div className="card text-center">
                      <Link href={`/productsMobile/${mobile.id}`} passHref>
                        <img
                          src={mobile.image_url}
                          alt={mobile.name}
                          className="img-fluid"
                          style={{ height: '130px', objectFit: 'cover', cursor: 'pointer' }}
                        />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title">{mobile.name}</h6>
                        <p className="card-text">${mobile.price}</p>
                        <StarRating rating={mobile.rating} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className='index-container-products2'>
        <Carousel indicators={false} controls={true}>
          {Array.from({ length: Math.ceil(filteredMobiles.length / 5) }).map((_, index) => (
            <Carousel.Item key={index}>
              <div className="row">
                {/* Column 1: 4 product cards in a 2x2 grid */}
                <div className="col-6">
                  <div className="row">
                    {filteredMobiles.slice(index * 5, index * 5 + 4).map((mobile) => (
                      <div key={mobile.id} className="col-6 mb-1">
                        <div className="card text-center h-150">
                          <Link href={`/productsMobile/${mobile.id}`} passHref>
                            <img
                              src={mobile.image_url}
                              alt={mobile.name}
                              className="img-fluid"
                              style={{ height: '130px', objectFit: 'cover', cursor: 'pointer' }}
                            />
                          </Link>
                          <div className="card-body">
                            <h6 className="card-title">{mobile.name}</h6>
                            <p className="card-text">${mobile.price}</p>
                            <StarRating rating={mobile.rating} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: 1 larger featured product card */}
                <div className="col-6">
                  {filteredMobiles[index * 5 + 4] && (
                    <div className="card text-center h-100">
                      <Link href={`/productsMobile/${filteredMobiles[index * 5 + 4].id}`} passHref>
                        <img
                          src={filteredMobiles[index * 5 + 4].image_url}
                          alt={filteredMobiles[index * 5 + 4].name}
                          className="img-fluid"
                          style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
                        />
                      </Link>
                      <div className="card-body">
                        <h3 className="card-title">{filteredMobiles[index * 5 + 4].name}</h3>
                        <p className="card-text">${filteredMobiles[index * 5 + 4].price}</p>
                        <p className="card-text">${filteredMobiles[index * 5 + 4].description}</p>
                        <StarRating rating={filteredMobiles[index * 5 + 4].rating} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <FooterNJ />
    </>
  );
};

export default Index;