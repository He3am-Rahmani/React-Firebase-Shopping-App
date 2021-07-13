import React, { useState } from "react";
import { Card, Button, Alert, Image, Col, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import myPic from "../Assets/images/myPic.png";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch(e) {
      setError("Failed to log out");
    }
  }
 

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 d-flex flex-column justify-content-center mt-5">
        <Card>
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
                <Image className={!currentUser.photoURL ? 'filter' : ''}
                alt='Avatar Photo'
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
    </div>
  );
}
