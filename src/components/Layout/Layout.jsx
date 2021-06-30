import React from "react";
import { Container } from "react-bootstrap";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import NewHeader from "../Header/NewHeader";
import NewFooter from "../Footer/NewFooter";

export default function Layout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <NewHeader />
      <Container id="main-cont">{children}</Container>
      <NewFooter />
      {/* <Footer /> */}
    </>
  );
}
