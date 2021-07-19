import React from "react";
import { Form, Button, Alert, ListGroup, Col, Row } from "react-bootstrap";

export const AddAdmin = ({
  error,
  message,
  refs,
  addAdminHandler,
  adminInfo,
}) => {
  return (
    <Form variant="white">
      <h2>Add New Admin</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      {/* {message && <Alert variant="success">{message}</Alert>} */}
      <Form.Group id="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" ref={refs.addAdminNameRef} required />
      </Form.Group>
      <Form.Group id="userName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={refs.adminUserNameRef} required />
      </Form.Group>
      <Form.Group id="role">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" ref={refs.adminRoleRef} required>
          <option value="Admin">Admin</option>
          {adminInfo.role === "Senior Admin" ? (
            <option value="Head Admin">Head Admin</option>
          ) : (
            <></>
          )}
        </Form.Control>
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={refs.adminPassRef} required />
      </Form.Group>
      <Button onClick={addAdminHandler} className="w-100">
        ADD Admin
      </Button>
    </Form>
  );
};

export const ViewAdmins = ({ adminList }) => {
  return (
    <ListGroup variant="flush">
      <h2>View Admins</h2>
      {adminList.map((item,index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col md={4}>
              <i>
                <strong>Name: </strong>
                {item.name}
              </i>
            </Col>
            <Col md={4}>
              <i>
                <strong>UserName: </strong>
                {item.userName}
              </i>
            </Col>
            <Col md={4}>
              <i>
                <strong>Role: </strong>
                {item.role}
              </i>
            </Col>
            <Col md={4}>
              <i>
                <strong>Password: </strong>
                {item.password}
              </i>
            </Col>
            <Col md={4}>
              <i>
                <strong>AddedBy: </strong>
                {item.createdBy}
              </i>
            </Col>
            <Col md={4}>
              <i>
                <strong>Creator Role: </strong>
                {item.creatorRole}
              </i>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export const RemoveAdmin = ({ error, message, refs, removeAdminHandler }) => {
  return (
    <Form variant="white">
      <h2>Remove Admin</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>}  */}
      {/* {message && <Alert variant="success">{message}</Alert>} */}
      <Form.Group id="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={refs.delAdminRef} required />
      </Form.Group>
      <Button onClick={removeAdminHandler} className="w-100 btn-danger">
        Remove
      </Button>
    </Form>
  );
};
