import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/ProductPage";

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
import adminLogin from "./pages/Admin/Admin-login/adminLogin";
import adminDash from "./pages/Admin/Admin-Dashboard/adminDash";
import ContactUs from "./pages/ContactUs/ContactUs";
import "./App.css";
import About from "./pages/About/About";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <Router>
      <div
        className="d-flex flex-column justify-content-between "
        style={{ minHeight: "100vh" }}
      >
        <AuthProvider>
          {/* <Header /> */}
          {/* <Container id="main-cont"> */}
          <Layout>
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/products/:id" component={Product} />
              <Route path="/account" component={Account} />
              <PrivateRoute path="/cart/:id?" component={Cart} exact />
              <Route path="/admin/login" component={adminLogin} />
              <PrivateRoute component={Dashboard} path="/dashboard" exact />
              <Route path="/admin/dashboard/" component={adminDash} />
              <Redirect from="/admin" to="/admin/login/" />
              <PrivateRoute path="/contact" component={ContactUs} />
              {/* <Route exact path="/cart" component={Cart} /> */}
              <Route path="/about" component={About} />
              <Route component={nfPage} />
            </Switch>
          </Layout>
          {/* </Container> */}
        </AuthProvider>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
