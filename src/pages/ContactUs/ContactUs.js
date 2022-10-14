import axios from "axios";
import React, { useState, useRef } from "react";
import { Container, Alert, Form, Card, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";

const ContactUs = ({ history }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { currentUser } = useSelector((state) => state.currentUser);

  const emailRef = useRef();
  const nameRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  document.title = "Contact Us";

  if (error !== "" || message !== "") {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 3000);
  }

  const setTokenHandler = () => {
    if (
      emailRef.current.value === "" ||
      nameRef.current.value === "" ||
      subjectRef.current.value === "" ||
      messageRef.current.value === ""
    ) {
      setError("We Need All Fields For This Operation");
    } else {
      axios
        .post(`http://localhost:8000/api/ticket/new-ticket`, {
          key: process.env.REACT_APP_API_KEY,
          name: nameRef.current.value,
          email: emailRef.current.value,
          subject: subjectRef.current.value,
          message: messageRef.current.value,
        })
        .then((response) => {
          if (response.data.message.type === "success") {
            setMessage("Token Submited We Will Contact To You Soon");
            setTimeout(() => {
              history.push("/");
            }, 3000);
          } else {
            setError(response.data.message.message);
          }
        })
        .catch((err) => setError(err));
    }
  };

  const useStyles = createUseStyles({
    nameFormGroup: {
      width: "45%",
      alignItems: "center",
      justifyContent: "center",
      "@media(max-width:570px)": {
        width: "100%",
        "&:hover": {},
      },
    },
    emailFormGroup: {
      width: "45%",
      "@media(max-width:570px)": {
        width: "100%",
      },
    },
  });

  const styles = useStyles();

  return (
    <div className="d-flex justify-content-center">
      <Container>
        <div className="w-100 d-flex flex-column justify-content-center mt-5 test-s">
          <Card>
            <Card.Body>
              <Form>
                <h2 className="text-center mb-4">Contact Us</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Row
                  className="d-flex flex-sm-row justify-content-sm-between flex-column "
                  style={{
                    margin: ".1rem",
                  }}
                >
                  <Form.Group className={styles.nameFormGroup} id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="Name"
                      defaultValue={currentUser.displayName}
                      ref={nameRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group className={styles.emailFormGroup} id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={currentUser.email}
                      ref={emailRef}
                      required
                      readOnly
                    />
                  </Form.Group>
                </Row>

                <Form.Group id="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="subject" ref={subjectRef} required />
                </Form.Group>
                <Form.Group id="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" ref={messageRef} required />
                </Form.Group>
                <Button
                  onClick={setTokenHandler}
                  className="w-100"
                  disabled={!currentUser.haveContactToken}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
