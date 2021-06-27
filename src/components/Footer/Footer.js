import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  const scrollTop = (action) => {
    switch (action.type) {
      case "home":
        window.scrollTo({ behavior: "smooth", top: action.to });
        break;

      case "prod":
        window.scrollTo({ behavior: "smooth", top: action.to });
        break;

      default:
        window.scrollTo({ behavior: "smooth", top: action.to });
        break;
    }
  };

  return (
    <React.Fragment>
      <footer className="footer">
        <Col>
          <h4>
            Stay Connect With Us <i className="fa fa-heart"></i>{" "}
            <i className="fa fa-arrow-down"></i>
          </h4>
          <div className="footer-display">
            <Row>
              <div className="footer-icon-hold">
                <Row className="footer-icon-holder" title="Instagram">
                  <a
                    target="blankّ"
                    href="https://www.instagram.com/he3am_rahmani/"
                  >
                    <span className="footer-icon">
                      <i className="fa fa-instagram"></i>
                    </span>
                  </a>
                </Row>
                <Row className="footer-icon-holder" title="LinkedIn">
                  <a
                    target="blankّ"
                    href="https://www.linkedin.com/in/hesam-rahmani-5a2b871b7/"
                  >
                    <span className="footer-icon">
                      <i className="fa fa-linkedin"></i>
                    </span>
                  </a>
                </Row>
                <Row className="footer-icon-holder" title="Twitter">
                  <a target="blankّ" href="https://twitter.com/he3am-rahmani">
                    <span className="footer-icon">
                      <i className="fa fa-twitter"></i>
                    </span>
                  </a>
                </Row>
                <Row className="footer-icon-holder" title="GitHub">
                  <a target="blank" href="https://github.com/he3am-rahmani">
                    <span className="footer-icon">
                      <i className="fa fa-github"></i>
                    </span>
                  </a>
                </Row>
              </div>
            </Row>

            <div className="footer-link-holder">
              <Col>
                <Link
                  className="footer-links"
                  onClick={(event) => scrollTop({ type: "home", to: 0 })}
                  to="/"
                >
                  Home &gt;
                </Link>
              </Col>
              <Col>
                <Link
                  className="footer-links"
                  onClick={(event) => scrollTop({ type: "prod", to: 20 })}
                  to="/"
                >
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
            </div>
          </div>
        </Col>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
