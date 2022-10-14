import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfileAction } from "../action/userAction";
export default function UpdateProfile() {
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const avatarRef = useRef();
  const displayNameRef = useRef();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.currentUser);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const useStyles = createUseStyles({
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: isEditing ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
      gap: "1rem",
      margin: "1rem auto",
      width: "100%",
      "@media(max-width:570px)": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
      },
    },
    avatar: {
      width: "100px",
      height: "100px",
      marginLeft: "5px",
      textAlign: "right",
      background: currentUser.photoURL
        ? `url(${currentUser.photoURL})`
        : "none",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "50%",
      "@media(max-width:570px)": { margin:"0 auto" },
    },
    profileText: {
      border: "1px solid #ccccccbd",
      padding: "8px 16px",
      borderRadius: ".25rem",
    },
  });

  const isPasswordStrong = (password) => {
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    console.log(strongPassword.test(password));
    return strongPassword.test(password);
  };

  if (error !== "" || message !== "") {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2500);
  }

  async function handleSubmit() {
    const password = passwordRef.current.value;
    const photoURL = avatarRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    const displayName = displayNameRef.current.value;
    const userName = userRef.current.value;
    const email = emailRef.current.value;

    setLoading(true);

    if (password !== "" && passwordConfirm !== "") {
      if (password !== passwordConfirm) {
        setLoading(false);
        return setError("Passwords do not match");
      }
      if (!isPasswordStrong(password)) {
        setLoading(false);
        return setError("Password Is Not Secure");
      }
    }

    const { message } = await dispatch(
      updateUserProfileAction(currentUser._id, {
        displayName:
          displayName === currentUser.displayName
            ? currentUser.displayName
            : displayName,
        email: email === currentUser.email ? currentUser.email : email,
        userName:
          userName === currentUser.userName ? currentUser.userName : userName,
        photoURL:
          photoURL === currentUser.photoURL ? currentUser.photoURL : photoURL,
        password: password === "" ? "" : password,
      })
    );

    message.type === "failed"
      ? setError(message.message)
      : setMessage(message.message);

    setLoading(false);
  }
  const styles = useStyles();
  return (
    //<div className="d-flex justify-content-center">
    <div className={styles.content}>
      <h2 className="text-primary text-left mb-4 w-100">Privacy & Security</h2>
      {error && (
        <Alert variant="danger" className="w-100">
          {error}
        </Alert>
      )}
      {message && (
        <Alert variant="success" className="w-100">
          {message}
        </Alert>
      )}
      <div className={styles.card}>
        {isEditing ? (
          <>
            <Form.Group id="avatar">
              <Form.Label className="text-primary">Avatar</Form.Label>
              <Form.Control
                type="text"
                ref={avatarRef}
                defaultValue={currentUser.photoURL}
                placeholder="Your Photo Url"
              />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label className="text-primary">Username</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                required
                defaultValue={currentUser.userName}
              />
            </Form.Group>
            <Form.Group id="Name">
              <Form.Label className="text-primary">Name</Form.Label>
              <Form.Control
                type="text"
                ref={displayNameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="text-primary">Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label className="text-primary">Password</Form.Label>
              <Form.Control
                type="password"
                defaultValue=""
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
                autoComplete="new-password"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="text-primary">
                Password Confirmation
              </Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
          </>
        ) : (
          <>
            <Form.Group id="avatar">
              <Form.Label className="text-primary-500">Avatar</Form.Label>
              <div
                className={
                  currentUser && currentUser.photoURL !== "" && styles.avatar
                }
                alt="Avatar Photo"
              ></div>
            </Form.Group>
            <Form.Group className="d-flex flex-col" id="username">
              <Form.Label className="text-primary-500">Username: </Form.Label>
              <Form.Label className={styles.profileText}>
                {currentUser.userName}
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex flex-col" id="Name">
              <Form.Label className="text-primary-500">Name</Form.Label>
              <Form.Label className={styles.profileText}>
                {currentUser.displayName}
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex flex-col" id="email">
              <Form.Label className="text-primary-500">Email</Form.Label>
              <Form.Label className={styles.profileText}>
                {currentUser.email}
              </Form.Label>
            </Form.Group>
          </>
        )}
      </div>
      {!isEditing ? (
        <Button
          disabled={loading}
          onClick={() => setIsEditing(true)}
          className="w-100"
        >
          Update
        </Button>
      ) : (
        <div className="d-flex flex-row w-100 justify-content-center">
          <Button
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="w-50 mr-5"
            variant="danger"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            className="w-50 ml-5"
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </div>
      )}
    </div>
    //</div>
  );
}
