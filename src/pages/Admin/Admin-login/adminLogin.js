import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../../action/userAction";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userRef = useRef("");
  const passwordRef = useRef("");
  let history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars

  document.title = "Login Admin Panel";
  const useStyles = createUseStyles({
    content: {
      width: "100%",
      justifyContent: "center",
    },

    card: {
      margin: "1rem auto",
      width: "50%",
      "@media(max-width:570px)": { width: "100%" },
    },
  });

  if (error !== "" || message !== "") {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
  }

  const logout = () => {
    setError("");

    try {
      dispatch(userLogoutAction());
      history.push("/login");
    } catch (e) {
      setError("Failed to log out");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userName: userRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      axios
        .post("https://no1-shop.herokuapp.com/api/admin/login", data)
        .then((response) => {
          const adminId = response.data.data.id;
          if (adminId) {
            setError("");
            if (response.data.data) {
              setMessage(
                `Welcome ${response.data.data.role} ${response.data.data.userName} Redirect Operation In 3 Second`
              );
              axios
                .post("https://no1-shop.herokuapp.com/api/tocken/new", {
                  apiKey: process.env.REACT_APP_API_KEY,
                  key: Date.now().toString(),
                  admin: adminId,
                })
                .then((response) => {
                  setTimeout(() => {
                    logout();
                    history.push({
                      pathname: "/admin/dashboard/",
                      state: response.data.tocken.url,
                    });
                  }, 3000);
                });
            } else {
              setError("NoT Valid Data");
            }
          } else {
            setError("Not Correct");
          }
        })
        .catch((err) => {
          setError("Not Correct Try Again");
        });
    } catch (error) {
      setError(error);
    }
  };

  const styles = useStyles();

  return (
    // <div className="d-flex justify-content-center">
    <div className={styles.content}>
      <Card className={styles.card}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In To Admin Panel</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form>
            <Form.Group id="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={userRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100" onClick={handleSubmit}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        If You Lost ? <Link to="/">You Can Come Home With Me</Link>
      </div>
    </div>
    // </div>
  );
}
