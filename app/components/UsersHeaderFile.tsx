import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import './style.css'
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';
import { FaBox } from 'react-icons/fa';



function UsersHeaderFile() {
  return (
    <div>
      
        
        <Navbar expand="lg" className="header-containner">
      <Container>
        <Navbar.Brand href="/"><h2><strong>MyCommerce</strong></h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Link href="/" passHref>
              <Button variant="primary">
                      <FaHome style={{ fontSize: '17px', marginRight: '8px' }} /> 
                     Home
                     </Button>
                     </Link>
            <Link href="/carts" passHref>
               <Button>
                  <FaShoppingCart style={{ fontSize: '17px', marginRight: '8px' }} />
               </Button>
              </Link>


              <Link href="createUser/" passHref>
              <Button variant="primary">
                 <FaPen style={{ fontSize: '17px', marginRight: '8px' }} /> Create User
              </Button></Link>

              <Link href="userList/" passHref>

              <Button variant="primary">
      <FaList style={{ fontSize: '17px', marginRight: '8px' }} /> View List
    </Button></Link>

    <Link href="mobile" passHref>
    <Button variant="primary">
          <FaBox style={{ fontSize: '17px', marginRight: '8px' }}/> Product
        </Button></Link>

            {/* <Nav.Link href="user/createUser">create</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">...</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



    </div>
  )
}






export default UsersHeaderFile