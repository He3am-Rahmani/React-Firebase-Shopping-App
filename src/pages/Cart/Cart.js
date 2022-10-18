import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ModalTitle,
  Form,
  InputGroup,
  Alert,
  Container,
} from "react-bootstrap";

import { addToCart, removeFromCart } from "../../action/cartAction";
import axios from "axios";
import "./Cart.css";

const Cart = ({ match, history }) => {
  const productId = match.params.id;

  const discRef = useRef("");

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems);
  // const cartItems = [];
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dis, setDis] = useState(false);
  const [afterDisPrice, setAfterDisPrice] = useState();
  let showDiscount = <></>;

  useEffect(() => {
   
    let redTotalPrice = cartItems.reduce(
      (acc, item) => Number(acc) + Number(item.price),
      ""
    );
    setTotalPrice(redTotalPrice);
    document.title = "Cart";
  }, [dispatch, match, productId, cartItems, history]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  if (error !== "" || message !== "") {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2500);
  }

  const discountHandler = () => {
    let existedPrice = cartItems.reduce(
      (acc, item) => Number(acc) + Number(item.price),
      ""
    );
    if (existedPrice) {
      if (discRef.current.value !== "") {
        axios
          .post(
            `https://no1-shop.herokuapp.com/api/discount/check/${discRef.current.value}`,
            { key: process.env.REACT_APP_API_KEY }
          )
          .then((Response) => {
            if (totalPrice === existedPrice) {
              if (Response.data.message.type === "failed") {
                setError(Response.data.message.message);
              } else {
                let dis = Response.data.data.value;
                let afterDis = totalPrice * (dis / 100);

                let finalPrice = totalPrice - afterDis;

                setDis(true);

                setAfterDisPrice(finalPrice);
                setMessage("Code Is Valid Cart Updated");
              }
            } else {
              setError("You Already Use An Discount Code");
            }
          })
          .catch((err) => {
            setError(`${err.message}`);
          });
      } else {
        setError("Enter Discount Code");
      }
    } else {
      setError("Cart Is Empty");
    }
  };

  const getPrice = () => {
    if (dis) {
      //disable-eslint-for-next-line
      return (
        <>
          Total Price:{" "}
          <span style={{ color: "#ca0027" }} className="strikethrough">
            {" "}
            {totalPrice} Mil
          </span>{" "}
          -&gt;{" "}
          <span style={{ color: "#12c942" }}>
            {Math.round(afterDisPrice)} Mil
          </span>
        </>
      );
    } else {
      return <>Total Price : {totalPrice} Mil</>;
    }
  };

  const removeDiscount = () => {
    setDis(false);
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <ModalTitle>Cart</ModalTitle>
          {cartItems.length === 0 ? (
            <p>Your Cart Is Empty</p>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>{item.name}</Col>
                    <Col md={3}>{item.price} Mil</Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          {error && (
            <Alert style={{ marginTop: "1rem" }} variant="danger">
              {error}
            </Alert>
          )}
          {message && (
            <Alert style={{ marginTop: "1rem" }} variant="success">
              {message}
            </Alert>
          )}
          <Card style={{ margin: "1rem 0 2rem 0" }}>
            <ListGroup variant="flush">
              <ListGroup.Item className>
                {cartItems.length ? getPrice() : "Cart Is Empty"}
              </ListGroup.Item>
              {showDiscount}
            </ListGroup>
          </Card>

          <div
            inline
            style={{ marginTop: "1rem" }}
            className="d-flex flex-row gap-1"
          >
            {dis ? (
              <Button
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #D20000",
                  color: "#D20000",
                }}
                variant="danger"
                disabled={!dis}
                onClick={removeDiscount}
              >
                Remove Discount Code <strong> X</strong>
              </Button>
            ) : (
              <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    Discount Code <i>%</i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control ref={discRef} placeholder="" />
                <InputGroup.Append>
                  <Button disabled={dis} onClick={discountHandler}>
                    Apply
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            )}
          </div>
        </Col>
        <Col className="d-flex flex-row-reverse justify-content">
          <Button
            style={{ marginTop: "4rem" }}
            disabled={!cartItems.length}
            variant="success"
            onClick={() => {
              setError("Not Available");
            }}
          >
            Checkout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
