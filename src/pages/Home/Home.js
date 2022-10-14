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

    document.title = "Home";
    // callDispatch();
  }, [dispatch]);

  let filterdProducts = [];

  if (products.type === "failed" && products.length !== 0) {
    filterdProducts = [];
  } else {
    filterdProducts = products.filter((product) =>
      keyword === ""
        ? product
        : product.name.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
  }

  console.log(filterdProducts);

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

  if (products.type === "failed" && products.length !== 0) {
    View = (
      <>
        <h1>Failed to load Products </h1>
      </>
    );
  }

  return View;
};

export default Home;
