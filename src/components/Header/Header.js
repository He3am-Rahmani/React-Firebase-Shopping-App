import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.css";

const Header = () => {
  return (
    <header className="nav">
      <Navbar className="nav" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">NO1 Shop</Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer to="/account">
              <Nav.Link>
                <i className="pad fa fa-user"></i>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="pad fa fa-shopping-cart"></i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
