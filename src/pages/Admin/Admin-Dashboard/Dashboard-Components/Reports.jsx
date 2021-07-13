import React from "react";
import { ListGroup, Col, Row, Button, Alert } from "react-bootstrap";

export const ViewAndEditReports = ({
  error,
  message,
  ticket,
  delTicketHandler,
}) => {
  return (
    <ListGroup variant="flush">
      <h2>Reports</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <ListGroup.Item>
        <Row></Row>
      </ListGroup.Item>

      {ticket.length ? (
        ticket.map((item, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col style={{ textAlign: "right" }} md={12}>
                <Button
                  onClick={() => delTicketHandler(item._id)}
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
                  <strong>Email:</strong>
                </i>
              </Col>
              <Col md={5}>{item.email}</Col>{" "}
              <Col md={5}>
                <i>
                  <strong>Subject:</strong>
                </i>
              </Col>
              <Col md={5}>{item.subject}</Col>{" "}
              <Col md={5}>
                <i>
                  <strong>Message:</strong>
                </i>
              </Col>
              <Col md={5}>
                <pre>{item.message}</pre>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <h2>There Is Not Any Report </h2>
      )}
    </ListGroup>
  );
};
