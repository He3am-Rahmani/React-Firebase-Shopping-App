import axios from "axios";
import React, { useState, useRef } from "react";
import { Container, Alert, Form, Card, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { AiOutlineLoading } from "react-icons/ai";
import { VscCheck } from "react-icons/vsc";
const ContactUs = ({ history }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      axios
        .post(`https://no1-shop.herokuapp.com/api/ticket/new-ticket`, {
          key: process.env.REACT_APP_API_KEY,
          name: nameRef.current.value,
          email: emailRef.current.value,
          subject: subjectRef.current.value,
          message: messageRef.current.value,
        })
        .then((response) => {
          if (response.data.message.type === "success") {
            setMessage("Token Submited We Will Contact To You Soon");
            setLoading(false);
            setComplete(true);
            setTimeout(() => {
              history.push("/");
            }, 3000);
          } else {
            setLoading(false);
            setError(response.data.message.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  };

  const useStyles = createUseStyles({
    nameFormGroup: {
      width: "49%",
      alignItems: "center",
      justifyContent: "center",
      "@media(max-width:570px)": {
        width: "100%",
        "&:hover": {},
      },
    },
    emailFormGroup: {
      width: "49%",
      "@media(max-width:570px)": {
        width: "100%",
      },
    },
    submitButton: {
      display: "flex",
      justifyContent: "center",
      margin: "0 auto",
      width: "25%",
      padding: "10px 0",
      "@media(max-width:570px)": {
        width: "100%",
      },
    },

    buttonLoading: {
      transition: "2s ease all",
      width: "45px !important",
      height: "45px !important",
      backgroundColor: "#FFF80A !important",
      borderColor: "#FFF80A50 !important",
      cursor: "wait !important",
      borderRadius: "100% !important",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonSuccess: {
      transition: "2s ease all",
      borderRadius: "100% !important",
      width: "50px !important",
      height: "50px !important",
      backgroundColor: "rgb(0, 204, 109) !important",
      borderColor: "rgb(0, 204, 109,.5) !important",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "@keyframes loading": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    "@keyframes buttonSuccess": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    successIcon: {
      fontSize: "1.4rem",
    },
    loadingIcon: {
      animation: "$loading 1s ease 0s infinite",
      fontSize: "1.4rem",
      color: "#000000",
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
                  onClick={() => setTokenHandler()}
                  className={`${styles.submitButton} ${
                    loading ? styles.buttonLoading : ""
                  }
                  ${complete ? styles.buttonSuccess : ""}
                  `}
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading className={styles.loadingIcon} />
                  ) : complete ? (
                    <VscCheck className={styles.successIcon} />
                  ) : (
                    <>Submit</>
                  )}
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
