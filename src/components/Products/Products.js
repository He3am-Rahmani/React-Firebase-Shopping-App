import React from "react";
import { Card } from "react-bootstrap";
import './Products.css'
import { Link } from 'react-router-dom'


function Products({ product }) {
  return (
    <div>
      <Card className='fit-cont'>
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
        <Link to={`/products/${product._id}`} className='title'>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <h4>Price : {product.price} </h4>
      </Card>
    </div>
  );
}

export default Products;
