import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Navbar className="nav" variant="dark">
        <Container>
          <Navbar.Brand>
            <a href="/">NO1 Shop</a>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/account">
              <i className="pad fa fa-user"></i>{" "}
            </Nav.Link>
            <Nav.Link href="/cart">
              <i className="pad fa fa-shopping-cart"></i>{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
