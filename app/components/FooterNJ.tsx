import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaAddressBook, FaPhone, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

function FooterNJ() {
  return (
    <div>
      <div className='footer'>
        <Container>
          <Row className='text-center text-md-start'>
            <Col xs={12} md={7} className='mb-4 mb-md-0'>
              <div className='home-container-first3'>
                <h4><strong>Address & Contact</strong></h4>
                <span>
                  <Button variant="outline-info" className="m-2 w-1">
                    <FaAddressBook />
                  </Button>
                  No.1131/18D, KR Nataraja Gounder Valagam, Nadarmedu, Moolapalayam, Erode - 638002
                </span>
              </div>
              <div className='home-container-first3 mt-3'>
                <span>
                  <Button variant="outline-primary" className="m-2">
                    <FaPhone />
                  </Button>
                  Call Us : (+91) 9345702658
                  <br />
                  We are open from Monday to Saturday - 10.00 AM - 08.00 PM.
                </span>
              </div>
            </Col>

            <Col xs={12} md={3} className='mb-4 mb-md-0'>
              <div className='footer-container-home2'>
                <h4><strong>Quick Links</strong></h4>
              </div>
            </Col>

            <Col xs={12} md={2}>
              <div className='footer-container-home3'>
                <h4><strong>Social Media</strong></h4>
                <div>
                  <Button variant="outline-dark" className="m-2 w-1" href="https://www.instagram.com" target="_blank">
                    <FaInstagram />
                  </Button>
                  <Button variant="outline-primary" className="m-2" href="https://www.linkedin.com" target="_blank">
                    <FaLinkedin />
                  </Button>
                  <Button variant="outline-info" className="m-2" href="https://www.facebook.com" target="_blank">
                    <FaFacebook />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className='text-center mt-4'>
              <h5>Copyright © 2024. All Rights Reserved.</h5>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default FooterNJ;
