import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import myPic from "../../Assets/images/myPic.png";

import "./Header.css";

const Header = () => {
  const { currentUser } = useAuth();

  const history = useHistory();

  useEffect(() => {}, [history]);

  let userIcon = (
    <LinkContainer to="/account">
      <Nav.Link>
        <i className="pad fa fa-user"></i>
      </Nav.Link>
    </LinkContainer>
  );

  if (currentUser) {
    userIcon = (
      <LinkContainer to="/account">
        <Nav.Link className="filter-nav">
          <i
            id="user"
            style={{ fontFamily: "arial" }}
            className="pad fa fa-user-edit"
          ></i>
          <Image
            alt="Avatar Photo"
            className={!currentUser.photoURL ? "filter" : ""}
            src={currentUser.photoURL || myPic}
            style={{ width: "25px", height: "25px", marginleft: "5px" }}
            roundedCircle
          />
        </Nav.Link>
      </LinkContainer>
    );
  } else {
    userIcon = (
      <LinkContainer to="/account">
        <Nav.Link>
          <i id="user" className="pad fa fa-user"></i>
        </Nav.Link>
      </LinkContainer>
    );
  }

  return (
    <header id="nav-p" className="nav-parent">
      <Navbar className="nav" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              className="logo angry-animate"
              style={{ fontFamily: "logo" }}
            >
              NO1 Shop
            </Navbar.Brand>
          </LinkContainer>
          <Nav style={{ gap: "1rem" }}>
            {userIcon}
            <LinkContainer to="/cart">
              <Nav.Link>
                <i id="cart" className="pad fa fa-shopping-cart"></i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

export const NewHeader = ({ history }) => {
  const { currentUser } = useAuth();

  const NavItems = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "about" },
    { name: "Contact Us", to: "contact" },
    { name: "", to: "" },
  ];

  return (
    <header id="nav-p" className="nav">
      <Navbar>
        <Nav.Item></Nav.Item>
      </Navbar>
    </header>
  );
};
