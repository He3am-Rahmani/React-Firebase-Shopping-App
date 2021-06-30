import React from "react";
import { Card, Image } from "react-bootstrap";
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
          <Image
            alt={product.name + "Image"}
            src={product.image}
            width="316"
            height="251"
            style={{ image: "cover", padding: "0px" }}
          />
        </Link>
        <div className="product-card-description">
          <Link to={`/products/${product._id}`} className="title">
            <span className="title">{product.name}</span>
          </Link>
          <h4>Price : {product.price} Mil </h4>
        </div>
      </Card>
    </div>
  );
}

export default Products;
