import React from "react";
import { Card } from "react-bootstrap";
import './Products.css'

function Products({ product }) {
  return (
    <div>
      <Card className='fit-cont'>
        <a href={`/products/${product._id}`}>
          <Card.Img src={product.image} />
        </a>
        <a href={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </a>
        <h4>Price : {product.price} </h4>
      </Card>
    </div>
  );
}

export default Products;
