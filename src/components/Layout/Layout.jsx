import React, { useState } from "react";
import { Container } from "react-bootstrap";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import NewHeader from "../Header/NewHeader";
import NewFooter from "../Footer/NewFooter";
import { useAuth } from "../../contexts/AuthContext";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(useAuth().currentUser);

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
