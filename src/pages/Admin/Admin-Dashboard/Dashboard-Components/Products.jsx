import React, { useRef } from "react";
import {
  Form,
  Alert,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";

export const AddProduct = ({ error, message, refs, addProductHandler }) => {
  return (
    <Form variant="white">
      <h2>Add New Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form.Group id="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" ref={refs.addNameRef} required />
      </Form.Group>
      <Form.Group id="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" ref={refs.priceRef} required />
      </Form.Group>
      <Form.Group id="image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" ref={refs.imageRef} required />
      </Form.Group>
      <Form.Group id="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" ref={refs.DescRef} required />
      </Form.Group>
      <Button onClick={addProductHandler} className="w-100">
        ADD
      </Button>
    </Form>
  );
};

export const DeleteProduct = ({
  error,
  message,
  refs,
  removeProductHandler,
}) => {
  return (
    <Form variant="white">
      <h2>Delete Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form.Group id="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" ref={refs.delNameRef} required />
      </Form.Group>
      <Button onClick={removeProductHandler} className="w-100 btn-danger">
        Delete
      </Button>
    </Form>
  );
};

export const ViewProducts = ({
  products,
  setOperation,
  setSelectedProduct,
  removeProductHandler,
}) => {
  let ref = useRef();
  return (
    <>
      <h2>View & Edit Products</h2>
      <ListGroup ref={ref} variant="flush">
        {products.map((item, index) => (
          <ListGroup.Item id={item._id} key={index}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col md={3}>{item.name}</Col>
              <Col md={3}>{item.price} Mil</Col>
              <Col md={2}></Col>
              <Col md={1}>
                <i
                  onClick={() => {
                    setSelectedProduct(item);
                    setOperation("EDIT_PRODUCTS");
                  }}
                  style={{ cursor: "pointer" }}
                  className="text-primary fa fa-edit"
                ></i>
              </Col>
              <Col md={1}>
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    let productName = item.name;
                    removeProductHandler(
                      productName,
                      ref.current.children[index],
                      index
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  className="text-danger fa fa-trash"
                ></i>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export const EditProducts = ({
  error,
  message,
  refs,
  selectedProduct,
  setOperation,
  updateProdHandler,
}) => {
  
  return(
    <Form variant="white">
    <h2>Edit Product</h2>
    {error && <Alert variant="danger">{error}</Alert>}
    {message && <Alert variant="success">{message}</Alert>}
    <Form.Group id="name">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        defaultValue={selectedProduct.name}
        ref={refs.updateNameRef}
        placeholder="Leave Blank For Same"
        required
        />
    </Form.Group>
    <Form.Group id="price">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="text"
        defaultValue={selectedProduct.price}
        ref={refs.updatePriceRef}
        placeholder="Leave Blank For Same"
        required
      />
    </Form.Group>
    <Form.Group id="image">
      <Form.Label>Image</Form.Label>
      <Form.Control
        type="text"
        defaultValue={selectedProduct.image}
        ref={refs.updateImageRef}
        placeholder="Leave Blank For Same"
        required
      />
    </Form.Group>
    <Form.Group id="Description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        defaultValue={selectedProduct.description}
        ref={refs.updateDescRef}
        placeholder="Leave Blank For Same"
        required
        />
    </Form.Group>
    <Row
      className="w-100 d-flex"
      style={{ gap: "1rem", justifyContent: "space-around" }}
      >
      <Button
        variant="danger"
        onClick={() => {
          setOperation("VIEW_PRODUCTS");
        }}
        style={{ width: "45%" }}
        >
        Cancel
      </Button>
      <Button
        onClick={() => updateProdHandler(selectedProduct._id)}
        style={{ width: "45%" }}
        >
        Update
      </Button>
    </Row>
  </Form>
)
};
