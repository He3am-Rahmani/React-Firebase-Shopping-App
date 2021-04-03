import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

import "./App.css";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <Home />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
