import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/ProductPage";

import "./App.css";
import { Container } from "react-bootstrap";
import nfPage from "./pages/404Page/nfPage";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import UpdateProfile from "./auth/UpdateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./auth/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column justify-content-between " style={{minHeight:'100vh'}}>
        <Header />
        <Container>
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/products/:id" component={Product} />
              <Route path="/account" component={Account} />
              <PrivateRoute path="/cart" component={Cart} exact />
              <PrivateRoute component={Dashboard} path="/dashboard" exact />
              {/* <Route exact path="/cart" component={Cart} /> */}
              <Route component={nfPage} />
            </Switch>
          </AuthProvider>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
