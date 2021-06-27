import React from "react";
import "./Account.css";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../../auth/Login";
import Dashboard from "../../auth/Dashboard";

const Account = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Dashboard /> : <Login />;
};

export default Account;
