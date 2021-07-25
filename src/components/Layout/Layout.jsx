import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import NewHeader from "../Header/NewHeader";
import NewFooter from "../Footer/NewFooter";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(useAuth().currentUser);

  const history = useHistory();

  const title = () => {
    switch (history.location.pathname) {
      case "/":
        return "Home";
      case "/about":
        return "About";
      case "/cart":
        return "Cart";
      case "/login":
        return "Login";
      case "/signup":
        return "Sign-Up";
      case "/contact":
        return "Contact Us";
      case "/dashboard":
        return "Dashboard";
      case "/forgot-password":
        return "Forgot Password";
      case "/update-profile":
        return "Update Profile";
      case "/admin/dashboard/":
        return "Admin Dashboard";
      case "/admin/login":
        return "Admin Login";
      default:
        return "No1 Shop";
    }
  };

  useEffect(() => {
    document.title = title();
  });

  return (
    <>
      {/* <Header /> */}
      <NewHeader currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Container id="main-cont">{children}</Container>
      <NewFooter />
      {/* <Footer /> */}
    </>
  );
}
