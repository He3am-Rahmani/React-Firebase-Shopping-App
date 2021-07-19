import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../../Assets/images/user.png";
import { createUseStyles } from "react-jss";

const Reply = ({ reply }) => {
  const useStyles = createUseStyles({
    reply: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // border: "1px solid #0002",
      borderRadius: "5px",
      padding: ".5rem 1rem",
      width: "90%",
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
    replyBody: {
      width: "90%",
    },
    dateHolder: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: ".5rem",
    },
  });

  const styles = useStyles();
  return (
    <>
      <div className={styles.reply}>
        <div className={styles.split}>
          <div className={styles.user}>
            <img
              className={styles.avatar}
              src={reply.photoURL ? reply.photoURL : userIcon}
              alt={reply.author}
            />
            <div className={styles.dateHolder}>
              <Link className={styles.author}>{reply.author}</Link>
              <i>{reply.creationDate}</i>
            </div>
          </div>
        </div>
        <div className={styles.replyBody}>
          <p>{reply.body}</p>
        </div>
      </div>
    </>
  );
};

export default Reply;
