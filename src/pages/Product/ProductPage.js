import React, { useState, useEffect } from "react";
import { Col, Row, Image, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import NfPage from "../404Page/nfPage";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productDetailAction } from "../../action/ProductAction";
import { createUseStyles } from "react-jss";

import "./ProductPage.css";

const ProductPage = ({ history, match }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  const { loading, product } = productDetail;

  const useStyles = createUseStyles({
    backButton: {
      '&:hover':{
        textDecoration: 'none',
        color:'#000'
      }
    }
  });

  const styles = useStyles();

  useEffect(() => {
    dispatch(productDetailAction(match.params.id));
    document.title = product.name;
  }, [match, dispatch, product.name]);

  const addHandler = () => {
    setMessage("Product Added To your Cart Successfully");
    history.push(`/cart/${product._id}`);
  };

  let show = <NfPage />;
  if (!product) {
    show = <NfPage />;
  } else {
    loading
      ? (show = <h2>loading Product details</h2>)
      : (show = (
          <div>
            <Link className={styles.backButton} to="/">
              <i className="back-btn fa fa-arrow-left"></i> Back To Home Page
            </Link>

            <Row>
              <Col md="5">
                <Image
                  style={{ marginTop: "3rem" }}
                  width="400px"
                  src={product.image}
                />
              </Col>
              <Col md="5">
                <ListGroup className="description" variant="flush">
                  {message && <Alert variant="success">{message}</Alert>}
                  <ListGroup.Item>
                    <h3>
                      <strong>
                        <i>Name: </i>
                      </strong>
                      {product.name}
                    </h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>
                      <strong>
                        <i>Price:</i>
                      </strong>{" "}
                      {product.price} Mil
                    </h4>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h6>
                      <strong>
                        <i>Description: </i>
                      </strong>
                      {product.description}
                    </h6>
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
        ));
  }

  return show;
};

export default ProductPage;
