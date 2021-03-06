import React from "react";
import { Row, Col, Form, InputGroup, Container, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import ProductComp from "../../components/Products/Products.jsx";
import { Link } from "react-router-dom";

const ShowingProducts = ({
  products,
  keyword,
  setKeyword,
  setCurrentPage,
  loading,
  filterdProducts,
  paginate,
  beforFilterPostNumber,
  postsPerPage,
}) => {
  return (
    <div className="product">
      <Form inline style={{ flex: "1", justifyContent: "space-between" }}>
        {products ? <h2 className="intro">Products</h2> : <></>}
        <InputGroup style={{ marginRight: "1rem" }}>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <i style={{ fontWeight: "200" }} className="fa fa-search"></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="w-50"
            placeholder="Search"
            aria-label="search"
            aria-describedby="basic-addon1"
            value={keyword}
            onChange={(e) => {
              e.preventDefault();
              setKeyword(e.target.value);
              setCurrentPage(1);
            }}
          />
          {keyword ? (
            <InputGroup.Append>
              <Button
                variant="danger"
                onClick={() => {
                  setKeyword("");
                }}
              >
                X
              </Button>
            </InputGroup.Append>
          ) : (
            <></>
          )}
        </InputGroup>
      </Form>
      {filterdProducts.length === 0 && keyword ? (
        <h4>
          Not Found !{" "}
          <Link
            to=""
            onClick={() => {
              setKeyword("");
            }}
          >
            {" "}
            Reset Filters?
          </Link>
        </h4>
      ) : (
        <>
          <Row style={{ margin: "0"}}>
            {filterdProducts.map((item) => {
              return (
                <Col key={item.id} sm="12" md="6" lg="4">
                  <ProductComp product={item} />
                </Col>
              );
            })}
          </Row>
          {products.length >= 6 ? (
            // <Container>
            <>
              {keyword ? (
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={beforFilterPostNumber}
                  paginate={paginate}
                />
              ) : (
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={products.length}
                  paginate={paginate}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </>
        // </Container>
      )}
    </div>
  );
};

export default ShowingProducts;
