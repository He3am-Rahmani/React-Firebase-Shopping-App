import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { userLogoutAction } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { BsCalendar4 } from "react-icons/bs";
import { FiEye, FiUser } from "react-icons/fi";
import UpdateProfile from "./UpdateProfile";
import { Alert } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [view, setView] = useState("profile");
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.currentUser);

  let vue = <></>;

  const useStyles = createUseStyles({
    content: {
      width: "100%",
      justifyContent: "center",
      textAlign: "center",
    },

    card: {
      margin: "1rem auto",
      width: "100%",
      "@media(max-width:570px)": { width: "100%" },
    },
    cardTopContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
    },
    parentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
    },
    parentHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      border: "1px #d1d1d1d1 solid",
      borderRadius: "5px",
      transition: "all .5s ease-in",
    },
    headerButtons: {
      width: "100%",
      padding: "10px",
      color: "#007bff",
      borderRadius: "5px 5px 0 0 ",
    },
    headerButtonActive: {
      background: "#f3f3f3f3",
      transition: "all ease .25s",
    },
    profileContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "1.5rem",
      alignItems: "flex-start",
      "@media(max-width:570px)": { flexDirection: "column" },
    },
    profileSideLeft: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "6px 8px 16px rgba(17, 17, 17, 0.06)",
      padding: " 20px 20px 50px 20px",
      width: "30%",
      borderRadius: "8px",
      "@media(max-width:570px)": { width: "100%" },
    },
    iconTextHolder: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: ".8rem",
      width: "100%",
    },
    profileTextLabel: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "100%",
    },
    parentContentHolder: { width: "100%" },
    profileSideRight: {
      width: "70%",
      height: "24rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      "@media(max-width:570px)": { width: "100%" },
    },
    checkoutsHeader: { color: "#007bffcf" },
    checkoutsHolder: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "6px 8px 16px rgba(17, 17, 17, 0.06)",
      border: "1px solid #f3f3f340",
      borderBottom: "none",
      borderRight: "none",
    },
    logoutButton: {
      background: "#f3f3f3ff",
      padding: "8px 16px",
      borderRadius: "5px",
      color: "#e8103d",
      "@media(max-width:570px)": { width: "100%" },
      "&:hover": {
        backgroundColor: "#c3c3c393",
        color: "#e8103dd4",
      },
    },
  });

  async function handleLogout() {
    setError("");

    try {
      dispatch(userLogoutAction());
      history.push("/login");
    } catch (e) {
      setError("Failed to log out");
    }
  }

  const styles = useStyles();

  switch (view) {
    case "profile":
      document.title = "Profile";
      vue = (
        <>
          <div className={styles.profileContainer}>
            <div className={styles.profileSideLeft}>
              <div
                className={
                  currentUser && currentUser.photoURL !== "" && styles.avatar
                }
                alt="Avatar Photo"
              ></div>
              {currentUser.userName && (
                <div className={styles.iconTextHolder}>
                  <FiEye style={{ fontSize: "2rem", color: "#007bff" }} />
                  <div className={styles.profileTextLabel}>
                    <strong className="text-primary-500">Username:</strong>{" "}
                    {currentUser?.userName}
                  </div>
                </div>
              )}
              {currentUser.displayName && (
                <div className={styles.iconTextHolder}>
                  <FiUser style={{ fontSize: "2rem", color: "#007bff" }} />
                  <div className={styles.profileTextLabel}>
                    <strong className="text-primary-500">Name:</strong>{" "}
                    {currentUser?.displayName}
                  </div>
                </div>
              )}
              {currentUser.joinDate && (
                <div className={styles.iconTextHolder}>
                  <BsCalendar4
                    style={{ fontSize: "1.6rem", color: "#007bff" }}
                  />
                  <div className={styles.profileTextLabel}>
                    <strong className="text-primary-500">Join Date:</strong>{" "}
                    {currentUser?.joinDate}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.profileSideRight}>
              <h4 className={styles.checkoutsHeader}>
                Your Previous Checkouts
              </h4>
              <div className={styles.checkoutsHolder}>
                {currentUser?.checkouts?.length === 0 ? (
                  <></>
                ) : (
                  <h5>You Dont Have Any Checkouts</h5>
                )}
              </div>
            </div>
          </div>
        </>
      );
      break;

    case "privacy":
      document.title = "Privacy";
      vue = <UpdateProfile />;
      break;

    case "comments":
      document.title = "Comments";
      vue = <Comment comments={currentUser.comments} />;
      break;
    default:
      vue = <></>;
      break;
  }

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.parentHeader}>
          <button
            className={`${styles.headerButtons} ${
              view === "profile" ? styles.headerButtonActive : ""
            } `}
            onClick={() => setView("profile")}
          >
            Profile
          </button>
          <button
            className={`${styles.headerButtons} ${
              view === "privacy" ? styles.headerButtonActive : ""
            } `}
            onClick={() => setView("privacy")}
          >
            Privacy
          </button>
          <button
            className={`${styles.headerButtons} ${
              view === "comments" ? styles.headerButtonActive : ""
            } `}
            onClick={() => setView("comments")}
          >
            Comments
          </button>
        </div>
        {error && (
          <Alert variant="danger" className="w-100">
            {error}
          </Alert>
        )}
        <div className={styles.parentContentHolder}>{vue}</div>
        <div className="text-right mt-5 w-100">
          <button
            className={styles.logoutButton}
            variant="danger"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

const Comment = ({ comments }) => {
  const [showReplys, setShowReplys] = useState(false);

  const useStyles = createUseStyles({
    parentContainer: {
      width: "100%",
      padding: "1rem",
      boxShadow: "6px 8px 16px rgba(17, 17, 17, 0.06)",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    commentsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    commentContainer: {
      borderRadius: "4px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "8px",
    },
    commentHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    commentHeaderPersonalInfoContainer: {
      display: "flex",
      gap: "8px",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    avatar: {
      width: "40px",
      height: "40px",
      marginLeft: "5px",
      textAlign: "right",
      borderRadius: "50%",
    },

    commentContent: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: ".75rem 0 0 3.3rem",
    },
    commentTextContainer: {},
    commentStatusContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: ".5rem",
    },
    showReplysButtonContainer: {
      width: "100%",
      borderTop: "1px solid #cbc9c969",
      textAlign: "center",
      margin: "1rem 0",
    },
    showReplysButton: {
      marginTop: "1rem",
      padding: "8px 1rem",
      color: "#3b82f680",
      "&:hover": {
        color: "#e8103dcc",
        backgroundColor: "#e3e0e040",
        borderRadius: "8px",
      },
    },
    showReplysButtonActive: {
      color: "#e8103d99",
    },
    replysContainer: {
      margin: "2rem auto",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: ".75rem",
      padding: "1rem",
      boxShadow: "2px 5px 10px 15px rgba(0,0,0,0.02)",
      borderRadius: "8px",
    },
    seperatorLine: {
      width: "80%",
      height: "1px",
      backgroundColor: "#cacaca3e",
    },
    replyHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    authorContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: ".5rem",
    },
    reply: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "1rem",
      gap: ".75rem",
      width: "100%",
      border: "#c3c3c350 1px solid",
      borderRadius: "8px",
    },
    replyDate: {},
    replyContent: {},
    replyTextContainer: {
      marginLeft: "3.25rem",
    },
  });

  const styles = useStyles();

  return (
    <div className={styles.parentContainer}>
      {comments.length !== 0 ? (
        <div className={styles.commentsContainer}>
          {comments.map((comment) => (
            <div className={styles.commentContainer}>
              <div className={styles.commentHeader}>
                <div className={styles.commentHeaderPersonalInfoContainer}>
                  <div
                    style={{
                      background:
                        comment.photoURL && `url(${comment.photoURL})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className={styles.avatar}
                  ></div>
                  <h6 className="text-primary-500 m-0">{comment.author}</h6>
                </div>
                <div className="text-primary-500">2022/6/6</div>
              </div>
              <div className={styles.commentContent}>
                <div className={styles.commentTextContainer}>
                  {comment.body}
                </div>
                <div className={styles.commentStatusContainer}>
                  <h6 className="text-primary-500 m-0">Status:</h6>
                  {comment.isVerified ? (
                    <AiOutlineEye
                      style={{
                        color: "rgb(3 166 43 / 61%)",
                        fontSize: "1.5rem",
                      }}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      style={{ color: "#e8103d", fontSize: "1.5rem" }}
                    />
                  )}
                </div>
              </div>
              {showReplys &&
                comment?.replys?.length !== 0 &&
                comment.isComment && (
                  <div className={styles.replysContainer}>
                    {comment.replys.map(
                      (reply, index, arr) =>
                        reply.isVerified && (
                          <>
                            <div className={styles.reply}>
                              <div className={styles.replyHeader}>
                                <div className={styles.authorContainer}>
                                  <div
                                    style={{
                                      background:
                                        reply?.photoURL &&
                                        `url(${reply?.photoURL})`,
                                      backgroundPosition: "center",
                                      backgroundSize: "cover",
                                    }}
                                    className={styles.avatar}
                                  ></div>
                                  <div className="text-primary">
                                    {reply.author}
                                  </div>
                                </div>
                                <div className={styles.replyDate}>
                                  2022/06/06
                                </div>
                              </div>
                              <div className={styles.replyContent}>
                                <div className={styles.replyTextContainer}>
                                  {reply.body}
                                </div>
                              </div>
                            </div>
                            {/* {arr.length - 1 !== index && (
                            <div className={styles.seperatorLine}></div>
                          )} */}
                          </>
                        )
                    )}
                  </div>
                )}
              {!comment?.replys?.length !== 0 && comment.isComment && (
                <div className={styles.showReplysButtonContainer}>
                  <button
                    className={`${styles.showReplysButton} ${
                      showReplys && styles.showReplysButtonActive
                    }`}
                    onClick={() => {
                      setShowReplys(!showReplys);
                    }}
                  >
                    {!showReplys ? <>Show</> : <>Hide</>} Comment Replys
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-primary-500">You Didn't Shared Any Comment Yet!</h4>
      )}
    </div>
  );
};
