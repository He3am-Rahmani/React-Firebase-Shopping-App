import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import userIcon from "../../Assets/images/user.png";

const Comments = ({ comment, children, refs, addReplyHandler, refChange }) => {
  const [wantReply, setWantReply] = useState(false);

  const useStyles = createUseStyles({
    comment: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #0002",
      borderRadius: "5px",
      padding: ".5rem 1rem",
      boxShadow: " 0 0 3px 3px rgba(0, 0, 0, 0.05) ",
    },
    split: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    user: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      gap: ".5rem",
    },
    avatar: { width: "30px", height: "30px", borderRadius: "25px" },
    author: {
      fontSize: "1.2rem",
      "&:hover": { textDecoration: "none", color: "#e8103d" },
    },
    commentBody: {
      width: "90%",
    },
    dateHolder: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: ".5rem",
    },
    reply: {
      "&:hover": { textDecoration: "none", color: "#000" },
    },
    replys: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: ".5rem",
      margin: "1rem 0",
    },
    cancelReply: {
      color: "#e8103d",
      "&:hover": { color: "#000", textDecoration: "none" },
    },
    addReplyBody: {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      margin: "1rem 0",
      justifyContent: "center",
      alignItems: "center",
    },
    addReplyBtn: { width: "50%" },
    replyInput: {
      border: "none",
      boxShadow: "0 0 2px 2px rgba(0,0,0,0.05)",
    },
  });

  const styles = useStyles();

  return (
    <div className={styles.comment}>
      <div className={styles.split}>
        <div className={styles.user}>
          <img
            className={styles.avatar}
            src={comment.photoURL ? comment.photoURL : userIcon}
            alt={comment.author}
          />
          <div className={styles.dateHolder}>
            <Link className={styles.author}>{comment.author}</Link>
            <i>{comment.creationDate}</i>
          </div>
        </div>

        <Link
          onClick={() => {
            setWantReply(!wantReply);
          }}
          className={wantReply ? styles.cancelReply : styles.reply}
        >
          {wantReply ? <>Cancel</> : <>Relpy</>}
        </Link>
      </div>
      <div className={styles.commentBody}>
        <p>{comment.body}</p>
      </div>
      <div className={styles.replys}>{children}</div>
      {wantReply ? (
        <div className={styles.addReplyBody}>
          <Form.Control
            as="textarea"
            className={styles.replyInput}
            placeholder={`Reply To ${comment.author} Comment `}
            // value={replyRef}
            onChange={refChange}
            ref={refs.replyRef}
          ></Form.Control>{" "}
          <Button
            className={styles.addReplyBtn}
            onClick={(comment) => addReplyHandler(comment)}
          >
            Reply
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
