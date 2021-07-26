import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "./Header-Components/HeaderComponents";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router";
import myPic from "../../Assets/images/user.png";
import { Container } from "react-bootstrap";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const NewHeader = ({ currentUser, setCurrentUser }) => {
  // const { currentUser }= useAuth();

  // const [ currentUser, setCurrentUser]  = useState(useAuth().currentUser);

  // console.log(currentUser);
  // console.log(user);

  const [showSideMenu, setSideMenu] = useState(false);

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
      case "/dashboard":
        return 4;
      case "/login":
        return 4;
      case "/signup":
        return 4;
      case "/update-profile":
        return 4;
      default:
        return null;
    }
  };

  const [NavItems, setNavItems] = useState({
    currentActive: current(),
    items: [
      { name: "Home", to: "/" },
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
        to: currentUser ? "/dashboard" : "/login",
        isAvatar: currentUser ? currentUser.photoURL || myPic : myPic,
      },
    ],
  });

  useEffect(() => {
    setSideMenu(false);
  }, [document.location.href]);

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
      color: "#000",
      borderBottom: "2px solid #000",
      paddingBottom: "5px",
    },
    navItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      "@media(max-width:430px)": {
        justifyContent: "flex-start",
        flexDirection: "column",
        position: "fixed",
        top: "0",
        right: "-100%",
        transition: "all 1.5s",
        height: "100%",
        zIndex: "100",
      },
    },
    navItemActiv: {
      justifyContent: "flex-start",
      right: 0,
      backgroundColor: "#c1c1c1c1",
      height: "100%",
      width: "80%",
      zIndex: "100",
      transition: "all 1s",
      boxShadow: "0 0  100px rgba(0, 0, 0, 0.05)",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontWeight: "500",
      fontSize: "2.5rem",
      fontFamily: "logo",
      "&:hover": {
        textDecoration: "none",
      },
      "@media(max-width:430px)": {
        fontSize: "1.7rem",
      },
    },
    login: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderLeft: "solid 1px #cccccc",
      position: "relative",
      left: "1rem",
      "@media(max-width:430px)": {
        border: "none",
      },
    },
    freeSpace: {
      display: "none",
      "@media(max-width:430px)": {
        display: "inline",
      },
    },
  });

  const styles = useStyle();

  return (
    <header id="nav-p">
      <navbar className={styles.navbar}>
        <Container className={styles.container}>
          <div className={styles.freeSpace}></div>
          <Link className={styles.logo} to="/">
            N01 SH0P
          </Link>
          <navItem
            className={`${styles.navItem} 
             ${showSideMenu ? styles.navItemActiv : null} 
          `}
          >
            {NavItems.items.map((item, index) => (
              <Button
                id={item.isAvatar ? "login" : null}
                isAvatar={item.isAvatar}
                onClick={() => {
                  setNavItems({ ...NavItems, currentActive: index });
                }}
                key={index}
                to={item.to}
                className={`${
                  index === NavItems.currentActive ? styles.active : null
                } ${item.isAvatar ? styles.login : null}  `}
              >
                {item.name}
              </Button>
            ))}
          </navItem>
          <div
            className={styles.freeSpace}
            style={{ zIndex: "400" }}
            onClick={() => {
              setSideMenu(!showSideMenu);
            }}
          >
            {!showSideMenu ? <BiMenu /> : <AiOutlineClose />}
          </div>
        </Container>
      </navbar>
    </header>
  );
};

export default NewHeader;
