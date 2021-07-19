import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

function Products({ product }) {
  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const useStyles = createUseStyles({
    image: {
      width: "220px",
      height: "230px",
      maxHeight: "230px",
      textAlign: "center",
      maxWidth: "220px",
      padding: "2rem !important",
      display: "inline-block",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      gap: ".5rem",
      margin: "1rem 1rem",
      maxWidth: "300px",
      maxHeight: "500px",
    },
    cardDescription: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
    },
    productPrice: {
      fontSize: "1.6rem",
      "&:hover": {
        color: "#e8103d",
        textDecoration: "none",
      },
    },
    price: { fontSize: "1.1rem" },
  });

  const styles = useStyles();

  return (
    <div>
      <Card className={styles.card} onClick={scroll}>
        <Link to={`/products/${product._id}`}>
          <Image
            className={styles.image}
            alt={product.name + "Image"}
            src={product.image}
            style={{ image: "cover", padding: "0px" }}
          />
        </Link>
        <div className={styles.cardDescription}>
          <Link to={`/products/${product._id}`} className={styles.productPrice}>
            <span>{product.name}</span>
          </Link>
          <h4>
            {product.price} <span className={styles.price}>Million</span>
          </h4>
        </div>
      </Card>
    </div>
  );
}

export default Products;
