import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "./Header-Components/HeaderComponents";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router";
import myPic from "../../Assets/images/myPic.png";
import { Container } from "react-bootstrap";

const NewHeader = () => {
  const { currentUser } = useAuth();

  const history = useHistory();

  const current = () => {
    switch (history.location.pathname) {
      case "/":
        return 0;

      case "/about":
        return 1;

      case "/contact":
        return 2;
      case "/cart":
        return 3;
      case "/account":
        return 4;
      default:
        return 0;
    }
  };

  const [NavItems, setNavItems] = useState({
    currentActive: current(),
    items: [
      { name: "Home", to: "/", isActive: true },
      {
        name: "About Us",
        to: "/about",
      },
      {
        name: "Contact Us",
        to: "/contact",
      },
      { name: "Cart", to: "/cart" },
      {
        name: currentUser ? currentUser.displayName : "Login/Sign-Up",
        to: currentUser ? "/account" : "login",
        isAvatar: currentUser ? currentUser.photoURL || myPic : myPic,
      },
    ],
  });

  const useStyle = createUseStyles({
    navbar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      gap: "0.5rem",
      borderBottom: "0.5px solid #f3f3f3",
      boxShadow: "0 0 5px 5px rgba(0,0,0,0.05)",
      marginBottom: "2rem",
    },
    active: {
      borderBottom: "2px solid #000",
    },
    navItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontWeight: "600",
      fontSize: "2rem",
      fontFamily: "logo",
      "&:hover": {
        textDecoration: "none",
      },
    },
    "login": {
      borderLeft: "solid 1px #cccccc",
      position: "relative",
      left: "1rem",
    },
  });

  const styles = useStyle();

  return (
    <header id="nav-p">
      <navbar className={styles.navbar}>
        <Container className={styles.container}>
          <Link className={styles.logo} to="/">
            N01 SH0P
          </Link>
          <navItem className={styles.navItem}>
            {NavItems.items.map((item, index) => (
              <Button
                isAvatar={item.isAvatar}
                onClick={() => {
                  setNavItems({ ...NavItems, currentActive: index });
                }}
                key={index}
                isActive={item.isActive}
                to={item.to}
                className={
                  `${index === NavItems.currentActive ? styles.active : null} ${item.isAvatar ? styles.login : null}  `
                }
              >
                {item.name}
              </Button>
            ))}
          </navItem>
        </Container>
      </navbar>
    </header>
  );
};

export default NewHeader;
