import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <Container>
          <h4>
            Stay Connect With Us <i className="fa fa-heart"></i> <i className='fa fa-arrow-down'></i>
          </h4>
          <Row className="footer-icon-hold">
            <Row className="footer-icon-holder" title="Instagram">
              <Link>
                <span className="footer-icon">
                  <i className="fa fa-instagram"></i>
                </span>
              </Link>
            </Row>
            <Row className="footer-icon-holder" title="LinkedIn">
              <Link>
                <span className="footer-icon">
                  <i className="fa fa-linkedin"></i>
                </span>
              </Link>
            </Row>
            <Row className="footer-icon-holder" title="Twitter">
              <Link>
                <span className="footer-icon">
                  <i className="fa fa-twitter"></i>
                </span>
              </Link>
            </Row>
            <Row className="footer-icon-holder" title="GitHub">
              <Link>
                <span className="footer-icon">
                  <i className="fa fa-github"></i>
                </span>
              </Link>
            </Row>
          </Row>
        </Container>
        <Container>
          <Col className="footer-link-holder">
            <Col>
              <Link className="footer-links" to="/">
                Home &gt;
              </Link>
            </Col>
            <Col>
              <Link className="footer-links" to="/">
                Products &gt;
              </Link>
            </Col>
            <Col>
              <Link className="footer-links" to="/contact">
                Contact Us &gt;
              </Link>
            </Col>

            <Col>
              <Link className="footer-links" to="/about">
                About Us &gt;
              </Link>
            </Col>
          </Col>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
