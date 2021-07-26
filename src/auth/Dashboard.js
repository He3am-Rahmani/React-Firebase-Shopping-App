import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Image, Col, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import myPic from "../Assets/images/myPic.png";
import { createUseStyles } from "react-jss";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const useStyles = createUseStyles({
    content: {
      width: "100%",
      justifyContent: "center",
      textAlign: "center",
    },

    card: {
      margin: "1rem auto",
      width: "50%",
      "@media(max-width:430px)": { width: "100%" },
    },
  });

  useEffect(() => {
    document.title = "Dashboard";
    if (
      document.querySelector("#login").innerHTML !==
      `<img class="image-0-2-16" alt="Avatar" src="${currentUser.photoURL}">${currentUser.displayName}`
    ) {
      document.querySelector(
        "#login"
      ).innerHTML = `<img class="image-0-2-16" alt="Avatar" src="${currentUser.photoURL}">${currentUser.displayName}`;
    }
    console.log(document.querySelector(`#login`).innerHTML);
  });

  async function handleLogout() {
    setError("");

    try {
      await logout();
      document.querySelector(
        "#login"
      ).innerHTML = `<img class="image-0-2-16" alt="Avatar" src="/static/media/myPic.366a8681.png">Login/Sign-Up`;
      history.push("/login");
    } catch (e) {
      setError("Failed to log out");
    }
  }

  const styles = useStyles();

  return (
    // <div className="d-flex justify-content-center">
    <div className={styles.content}>
      <Card className={styles.card}>
        <Card.Body>
          <Container>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                className={!currentUser.photoURL ? "filter" : ""}
                alt="Avatar Photo"
                src={currentUser.photoURL || myPic}
                style={{
                  width: "100px",
                  height: "100px",
                  marginLeft: "5px",
                  textAlign: "center",
                }}
                roundedCircle
              />
              <br />
              <div>
                <strong>Name:</strong> {currentUser.displayName}
              </div>
              <div>
                <strong>Email:</strong> {currentUser.email}
              </div>
            </Col>
          </Container>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
    /* </div> */
  );
}
