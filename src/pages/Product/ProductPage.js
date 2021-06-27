import React, { useState } from "react";
import { Col, Row, Image, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../../products";
import NfPage from "../404Page/nfPage";
import { Alert } from "react-bootstrap";

import "./ProductPage.css";

const ProductPage = ({ match }) => {
  const product = products.find((item) => {
    return item._id === match.params.id;
  });
  const [message, setMessage] = useState("");

  const addHandler = () => {
    setMessage("Product Added To your Cart Successfully");
  };


  let show = <NfPage />;
  if (!product) {
    show = <NfPage />;
  } else {
    show = (
      <div>
        <Link to="/">
          <i className="back-btn fa fa-arrow-left"> Back To Home Page</i>
        </Link>

        <Row>
          <Col md="6">
            <Image src={product.image} />
          </Col>
          <Col md="5">
            <ListGroup className="description" variant="flush">
              {message && <Alert variant="success">{message}</Alert>}
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>{product.price}</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <h6>{product.description}</h6>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="description" variant="flush">
              <ListGroup.Item>
                <Button className="btn btn-warning" onClick={addHandler}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }

  return show;
};

export default ProductPage;
