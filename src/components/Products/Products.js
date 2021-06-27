import React from "react";
import { Card } from "react-bootstrap";
import "./Products.css";
import { Link } from "react-router-dom";

function Products({ product }) {
  const scroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Card className="fit-cont" onClick={scroll}>
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
        <div className="product-card-description">
          <Link to={`/products/${product._id}`} className="title">
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <h4>Price : {product.price} </h4>
        </div>
      </Card>
    </div>
  );
}

export default Products;
