import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { createUserAction } from "../action/userAction";
import axios from "axios";
export default function Signup() {
  const dispatch = useDispatch();
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  document.title = "Sign Up";
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

  const isPasswordStrong = (password) => {
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    console.log(strongPassword.test(password));
    return strongPassword.test(password);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const displayName = displayNameRef.current.value;
    const userName = userRef.current.value;

    if (password !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (!isPasswordStrong(password)) {
      return setError("Password Is Not Secure");
    }

    try {
      setError("");

      setLoading(true);
      const data = await dispatch(
        createUserAction(userName, displayName, email, password)
      );
      console.log(data, "signUp Component");
      data.message.type === "failed"
        ? setError(data.message.message)
        : setMessage(data.message.message);

      if (data.message.type === "failed") throw new Error(data.message.message);

      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }
  const styles = useStyles();
  return (
    // <div className="d-flex justify-content-center">
    <div className={styles.content}>
      <Card className={styles.card}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form autoComplete="new-password" onSubmit={handleSubmit}>
            <Form.Group id="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                required
                placeholder="Username Should Be Unique"
                autoComplete="new-password"
                disabled={loading}
              />
            </Form.Group>
            <Form.Group id="displayName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                ref={displayNameRef}
                required
                placeholder=""
                autoComplete="new-password"
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
    // </div>
  );
}
