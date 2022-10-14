import React from "react";
import { Row, Col, Form, InputGroup, Container, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import ProductComp from "../../components/Products/Products.jsx";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { createUseStyles } from "react-jss";
import { IoIosSearch } from "react-icons/io";
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
  const useStyles = createUseStyles({
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    searchContainer: {
      width: "30%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 16px",
      border: "1px solid #c3c3c380",
      borderRadius: "50px",
    },
    searchInput: {
      width: "90%",
      border: "none",
      outline: "none",
      color: "#007bffd0",
      background: "transparent",
      ":-ms-input-placeholder": {
        color: "#007bffd0",
      },
      "::-ms-input-placeholder": {
        color: "#007bffd0",
      },
      "::placeholder": {
        color: "#007bffd0",
      },
    },
    searchIcon: {
      fontSize: "1.5rem",
      marginRight: "5px",
      color: "#007bffd0",
    },
  });

  const styles = useStyles();
  return (
    <div className="product">
      <Form className={styles.headerContainer}>
        {products ? (
          <h2
            style={{ margin: "0 0 1rem 0", alignSelf: "flex-start" }}
            className="intro"
          >
            Products
          </h2>
        ) : (
          <></>
        )}
        <label className={styles.searchContainer} for="search">
          <IoIosSearch className={styles.searchIcon} />
          <input
            id="search"
            className={styles.searchInput}
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
          {keyword ? <></> : <></>}
        </label>
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
          <Row style={{ margin: "0" }}>
            {loading
              ? [0, 1, 2, 3, 4, 5].map((item) => (
                  <Col
                    style={{ padding: 0 }}
                    key={item.id}
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <ProductComp product={item} loading={loading} />
                  </Col>
                ))
              : filterdProducts.map((item) => {
                  return (
                    <Col
                      style={{ padding: 0 }}
                      key={item.id}
                      sm="12"
                      md="6"
                      lg="4"
                    >
                      <ProductComp product={item} loading={loading} />
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
