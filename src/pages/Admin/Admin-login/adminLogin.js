import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userRef = useRef("");
  const passwordRef = useRef("");
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { currentUser, logout } = useAuth();

  if (error !== "" || message !== "") {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userName: userRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      axios
        .post("https://rocky-lake-08170.herokuapp.com/api/admin/login", data)
        .then((response) => {
          const adminId = response.data.data.id;
          if (adminId) {
            setError("");
            if (response.data.data) {
              setMessage(
                `Welcome ${response.data.data.role} ${response.data.data.userName} Redirect Operation In 3 Second`
              );
              axios
                .post("https://rocky-lake-08170.herokuapp.com/api/tocken/new", {
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
            setError("Check Your Password Case");
          }
        })
        .catch((err) => {
          setError("Not Correct Try Again");
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 d-flex flex-column justify-content-center mt-5 test-s">
        <Card>
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
          If You Lost ? <Link to="/">Come Home With Me</Link>
        </div>
      </div>
    </div>
  );
}
