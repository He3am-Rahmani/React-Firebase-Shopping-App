import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Product from './pages/Product/ProductPage'

import "./App.css";
import { Container } from "react-bootstrap";
import nfPage from "./pages/404Page/nfPage";
import Account from "./pages/Account/Account";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path='/products/:id' component={Product} />
          <Route path='/account' component={Account} />
          <Route component={nfPage}/>
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
