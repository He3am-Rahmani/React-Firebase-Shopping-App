import React from "react";
import { ListGroup, Row, Col, Alert, Button, Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";

export const ViewAndDeleteDiscounts = ({
  error,
  message,
  disList,
  delDisHandler,
}) => {
  return (
    <ListGroup variant="flush">
      <h2>Active Discounts</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      {/* {message && <Alert variant="success">{message}</Alert>} */}
      <ListGroup.Item>
        <Row></Row>
      </ListGroup.Item>

      {disList.length ? (
        disList.map((item, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col style={{ textAlign: "right" }} md={12}>
                <Button
                  onClick={() => delDisHandler(item._id)}
                  type="button"
                  variant="light"
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </Col>
              <Col md={5}>
                <i>
                  <strong>Name:</strong>
                </i>
              </Col>
              <Col md={5}>{item.name}</Col>{" "}
              <Col md={5}>
                <i>
                  <strong>Value:</strong>
                </i>
              </Col>
              <Col md={5}>{item.value}</Col>{" "}
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <h2>There Is Not Any Active Discount Code</h2>
      )}
    </ListGroup>
  );
};

export const AddDiscount = ({
  error,
  message,
  refs,
  perRange,
  setPerRange,
  addDiscHandler,
}) => {

  const useStyles = createUseStyles({range:{margin:'0 0 2rem 0'}})

  const styles = useStyles();

  return (
    <Form variant="white">
      <h2>Add Discount</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      {/* {message && <Alert variant="success">{message}</Alert>} */}
      <Form.Group id="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" ref={refs.addDiscNameRef} required />
      </Form.Group>
      <Form.Label>{perRange}%</Form.Label>
      <Form.Control
        className={styles.range}
        type="range"
        value={perRange}
        onChange={(e) => {
          setPerRange(e.target.value);
        }}
      />
      <Button onClick={addDiscHandler} className="w-100">
        ADD Discount
      </Button>
    </Form>
  );
};
