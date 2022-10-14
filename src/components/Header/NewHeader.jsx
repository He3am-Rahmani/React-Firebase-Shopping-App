import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Header-Components/HeaderComponents";
import { createUseStyles } from "react-jss";
import { useHistory, useLocation } from "react-router";
import myPic from "../../Assets/images/user.png";
import { Container } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
const NewHeader = ({ setCurrentUser }) => {
  const [showSideMenu, setSideMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.currentUser);
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
        name: "About Me",
        to: "/about",
      },
      {
        name: "Contact Us",
        to: "/contact",
      },
      { name: "Cart", to: "/cart" },
      {
        name: currentUser._id ? currentUser.displayName : "Login/Sign-Up",
        to: currentUser._id ? "/dashboard" : "/login",
        isAvatar: currentUser._id ? currentUser.photoURL || "withoutAvatar" : "withoutAvatar",
      },
    ],
  });

  useEffect(() => {
    const navbarStateClone = NavItems.items;

    const newAvatarState = {
      name: currentUser._id ? currentUser.displayName : "Login/Sign-Up",
      to: currentUser._id ? "/dashboard" : "/login",
      isAvatar: currentUser._id ? currentUser.photoURL || "withoutAvatar" : "withoutAvatar",
    };
    navbarStateClone.splice(4, 1, newAvatarState);
    setNavItems({ ...NavItems, items: navbarStateClone });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id, currentUser.photoURL, currentUser.displayName]);

  const useStyle = createUseStyles({
    navbarParent: {
      marginBottom: "8rem",
      "@media(max-width:570px)": {
        marginBottom: "6.5rem",
      },
    },
    navbar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      gap: "0.5rem",
      borderBottom: "0.5px ",
      boxShadow: "0 0 5px 5px rgba(0,0,0,0.05)",
      marginBottom: "2rem",
      zIndex: 500,
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(5px)",
      position: "fixed",
      top: 0,
      left: 0,
    },
    active: {
      color: "#000",
      borderBottom: "2px solid #000",
      paddingBottom: "5px",
      "@media(max-width:570px)": {
        border: "none",
        backgroundColor: "rgba(0,0,0,0.02)",
        width: "100%",
      },
    },
    navItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      "@media(max-width:570px)": {
        justifyContent: "flex-start",
        flexDirection: "column",
        position: "fixed",
        top: "0",
        right: "-100%",
        transition: "all 1.5s ease-in-out",
        height: "100vh",
        zIndex: "100",
      },
    },
    mobileNavbarContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    navItemActiv: {
      justifyContent: "flex-start",
      right: "0",
      backgroundColor: "rgba(255,255,255,1)",
      height: "100vh",
      width: "100%",
      zIndex: "100",
      transition: "all 1s",
      boxShadow: "0 0  100px rgba(0, 0, 0, 0.05)",
      padding: "3.5rem 0 0 0 ",
      fontSize: "1.5rem",
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
      "@media(max-width:730px)": {
        fontSize: "1.7rem",
      },
      "@media(max-width:570px)": {
        fontSize: "2.7rem",
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
      "@media(max-width:570px)": {
        border: "none",
        padding: "14px 2rem 14px 0 !important",
      },
    },
    freeSpace: {
      display: "none",
      "@media(max-width:570px)": {
        display: "inline",
      },
    },
  });

  const styles = useStyle();

  return (
    <header className={styles.navbarParent}>
      <navbar className={styles.navbar}>
        <Container fluid="lg" className={styles.container}>
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
                  setSideMenu(false);
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
            style={{
              zIndex: "400",
              color: "#007bff",
            }}
            onClick={() => {
              setSideMenu(!showSideMenu);
            }}
          >
            {!showSideMenu ? (
              <FiMenu style={{ fontSize: "1.5rem" }} />
            ) : (
              <MdClose style={{ fontSize: "1.7rem" }} />
            )}
          </div>
        </Container>
      </navbar>
    </header>
  );
};

/*
   <div
            className={styles.freeSpace}
            style={{
              zIndex: "400",
            }}
            onClick={() => {
              setSideMenu(!showSideMenu);
            }}
          >
            {!showSideMenu ? <FiMenu style={{fontSize:'1.5rem'}}/> : <MdClose style={{fontSize:'1.7rem'}}/>}
          </div>
          */

export default NewHeader;
