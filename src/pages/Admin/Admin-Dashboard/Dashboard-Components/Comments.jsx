import React, { useRef } from "react";
import { ListGroup, Col, Row, Image, Form, Alert } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import userPhoto from "../../../../Assets/images/user.png";

export const ViewAndEditComments = ({
  comments,
  removeCommentsHandler,
  setCommentVerified,
  error,
  message,
  setReplyVerified,
  removeReplysHandler,
}) => {
  let ref = useRef();

  const useStyles = createUseStyles({
    avatar: { width: "25px", height: "25px" },
  });

  const styles = useStyles();

  return (
    <>
      <h2>View & Edit Comments</h2>
      <ListGroup ref={ref} variant="flush">
        {comments.map((comment, commentIndex) => (
          <ListGroup.Item id={comment._id} key={commentIndex}>
            <Row>
              <Col md={2}>
                <Image
                  className={styles.avatar}
                  src={comment.photoURL ? comment.photoURL : userPhoto}
                  alt={comment.name}
                  fluid
                  rounded
                />
              </Col>
              <Col md={1}>{comment.author}</Col>
              <Col md={4}>{comment.authorEmail}</Col>
              <Col md={3}>{comment.body}</Col>
              <Col md={1}>
                <Form.Switch
                  type="switch"
                  id={`custom-switch-${comment._id}`}
                  checked={comment.isVerified}
                  onClick={() => {
                    setCommentVerified(
                      { id: comment._id, authorId: comment.authorId },
                      comment.isVerified
                    );
                    const selected = comments[commentIndex];
                    selected.isVerified = !comments[commentIndex].isVerified;
                    comments[commentIndex] = selected;
                  }}
                />
              </Col>
              <Col md={1}>
                <i
                  onClick={() => {
                    removeCommentsHandler(
                      { id: comment._id, authorId: comment.authorId },
                      commentIndex
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  className="text-danger fa fa-trash"
                ></i>
              </Col>
            </Row>
            {comment.replys.length !== 0 ? (
              <Col>
                <h4>Replys</h4>
                {comment.replys.map((reply, replyIndex) => (
                  <Row>
                    <Col md={2}>
                      <Image
                        className={styles.avatar}
                        src={reply.photoURL ? reply.photoURL : userPhoto}
                        alt={reply.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={1}>{reply.author}</Col>
                    <Col md={4}>{reply.email}</Col>
                    <Col md={3}>{reply.body}</Col>
                    <Col md={1}>
                      <Form.Switch
                        type="switch"
                        id={`custom-switch-${reply._id}`}
                        checked={reply.isVerified}
                        onClick={() => {
                          setReplyVerified(
                            {
                              commentId: comment._id,
                              replyId: reply._id,
                              commentAuthorId: comment.authorId,
                              authorId: reply.authorId,
                            },
                            reply.isVerified
                          );
                          // const selected = comments[replyIndex];
                          // console.log(comments[replyIndex]);
                          // console.log(comments[replyIndex]);
                          const selected = comment.replys[replyIndex];
                          selected.isVerified =
                            !comment.replys[replyIndex].isVerified;
                          comment.replys[replyIndex] = selected;
                        }}
                      />
                    </Col>
                    <Col md={1}>
                      <i
                        onClick={() => {
                          removeReplysHandler(
                            comment._id,
                            reply._id,
                            comment.authorId,
                            reply.authorId,
                            commentIndex,
                            replyIndex
                          );
                        }}
                        style={{ cursor: "pointer" }}
                        className="text-danger fa fa-trash"
                      ></i>
                    </Col>
                  </Row>
                ))}
              </Col>
            ) : null}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
