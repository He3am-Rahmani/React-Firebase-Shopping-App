import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../action/userAction";
import { useState as useHookState } from "@hookstate/core";

export default function Login() {
  const dispatch = useDispatch();

  const [counter, setCounter] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, user } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.currentUser);
  document.title = "Login";

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

  if (currentUser._id) {
    history.push("/dashboard");
  }
  useEffect(() => {
    if (currentUser._id) {
      history.push("/dashboard");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const { data, message } = await dispatch(
        userLoginAction(emailRef.current.value, passwordRef.current.value)
      );

      message.type === "failed"
        ? setError(message.message)
        : setMessage(message.message);
      if (message.type === "failed") throw new Error(message.message);

      console.log("reached To Redirect");

      if (message.type === "success") {
        setLoading(true);
        // setTimeout(() => {
          history.push("/dashboard");
        // }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }
  const styles = useStyles();
  return (
    // <div className="d-flex justify-content-center">
    <div className={styles.content}>
      <Card className={styles.card}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
    /* </div> */
  );
}
