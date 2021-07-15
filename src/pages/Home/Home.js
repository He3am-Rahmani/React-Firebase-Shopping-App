import React, { useEffect, useState } from "react";
import { Modal, Spinner, ModalBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../../action/ProductAction";
import "./Home.css";
import ShowingProducts from "./ShowingProducts";

const Home = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, products } = useSelector((state) => state.productList);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  let View;

  // const callDispatch = async () => {
  //   await
  // };

  useEffect(() => {
    dispatch(productListAction());
    document.title = 'Home'
    // callDispatch();
  }, [dispatch]);

  if (products.type === "failed" || products.length === 0) {
    View = (
      <>
        {loading ? (
          <Modal
            size="sm"
            style={{
              textAlign: "center",
            }}
            show={loading}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <ModalBody style={{ display: "flex" , flexDirection:'row',alignItems:'center',justifyContent:'center',gap:'1rem' }}>
              <Spinner
                as="span"
                animation="grow"
                size="md"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </ModalBody>
          </Modal>
        ) : (
          <>
            <h1>Failed to load Products </h1>{" "}
            <p>Status Code:500 Server Internal Error</p>
          </>
        )}
      </>
    );
  } else {
    let filterdProducts = products.filter((product) =>
      keyword === ""
        ? product
        : product.name.toLowerCase().includes(keyword.toLocaleLowerCase())
    );

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);

      window.scrollTo({ behavior: "smooth", top: 0 });
    };

    const beforFilterPostNumber = filterdProducts.length;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    filterdProducts = filterdProducts.slice(indexOfFirstPost, indexOfLastPost);

    View = (
      <ShowingProducts
        products={products}
        keyword={keyword}
        setKeyword={setKeyword}
        setCurrentPage={setCurrentPage}
        loading={loading}
        filterdProducts={filterdProducts}
        paginate={paginate}
        beforFilterPostNumber={beforFilterPostNumber}
        postsPerPage={postsPerPage}
      />
    );
  }

  return View;
};

export default Home;
