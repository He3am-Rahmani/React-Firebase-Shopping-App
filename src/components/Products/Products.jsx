import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

function Products({ product, loading }) {
  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const useStyles = createUseStyles({
    image: {
      height: "230px",
      maxHeight: "230px",
      maxWidth: "280px",
      textAlign: "center",
      padding: "1.5rem !important",
      display: "inline-block",
    },
    imageHolder: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem 1rem 0 1rem",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: ".5rem",
      margin: "1rem auto",
      maxWidth: "300px",
      maxHeight: "500px",
    },
    cardDescription: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      paddingLeft: "1rem",
    },
    productName: {
      fontSize: "1.6rem",
      "&:hover": {
        color: "#e8103d",
        textDecoration: "none",
      },
    },
    price: { fontSize: "1.1rem" },
  });

  const styles = useStyles();

  return loading ? (
    <>
      <Card
        style={{ height: "330px", justifyContent: "flex-start" }}
        className={styles.card}
      >
        <div
          style={{ height: "220px" }}
          className={`${styles.imageHolder} loading-background`}
        ></div>
        <div className={styles.cardDescription}>
          <>
            <div
              style={{
                width: "200px",
                height: "25px",
                margin: ".5rem 0 .5rem 0 ",
                borderRadius: "2px",
              }}
              className="loading-background"
            ></div>
          </>
          <div
            style={{
              width: "150px",
              height: "25px",
              marginBottom: ".5rem",
              borderRadius: "2px",
            }}
            className="loading-background"
          ></div>
        </div>
      </Card>
    </>
  ) : (
    <div>
      <Card className={styles.card} onClick={scroll}>
        <Link className={styles.imageHolder} to={`/products/${product._id}`}>
          <Image
            className={styles.image}
            alt={product.name + "Image"}
            src={product.image}
            style={{ image: "cover", padding: "0px" }}
          />
        </Link>
        <div className={styles.cardDescription}>
          <Link to={`/products/${product._id}`} className={styles.productName}>
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
