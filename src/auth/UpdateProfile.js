import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
export default function UpdateProfile() {
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const avatarRef = useRef();
  const {
    currentUser,
    updatePassword,
    updateEmail,
    updateUserName,
    updateAvatarPic,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
const useStyles = createUseStyles({
    content: {
      width: "100%",
      justifyContent: "center",
    },

    card: {
      margin: "1rem auto",
      width: "50%",
      "@media(max-width:430px)": { width: "100%" },
    },
  });
  useEffect(() => {
    passwordRef.current.value = "";
    document.title = "Update Profile";
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    if (userRef.current.value !== currentUser.displayName) {
      promises.push(updateUserName(userRef.current.value));
    }

    if (avatarRef.current.value !== currentUser.photoURL) {
      promises.push(updateAvatarPic(avatarRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
const styles = useStyles();
  return (
    //<div className="d-flex justify-content-center">
      <div className={styles.content}>
        <Card className={styles.card}>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="text"
                  ref={avatarRef}
                  defaultValue={currentUser.photoURL}
                  placeholder="Your Photo Url"
                />
              </Form.Group>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  ref={userRef}
                  required
                  defaultValue={currentUser.displayName}
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue=""
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </div>
    //</div>
  );
}
