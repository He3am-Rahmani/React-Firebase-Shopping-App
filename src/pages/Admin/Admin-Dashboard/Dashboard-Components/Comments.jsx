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
        {/* <Row>
          <Col md={2}>Author Avatar:</Col>
          <Col md={2}>DisplayName:</Col>
          <Col md={2}>Email:</Col>
          <Col md={1}>Body:</Col>
        </Row> */}
        {comments.map((item, commentIndex) => (
          <>
            <ListGroup.Item id={item._id} key={commentIndex}>
              <Row>
                <Col md={2}>
                  <Image
                    className={styles.avatar}
                    src={item.photoURL ? item.photoURL : userPhoto}
                    alt={item.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={1}>{item.author}</Col>
                <Col md={4}>{item.authorEmail}</Col>
                <Col md={3}>{item.body}</Col>
                <Col md={1}>
                  <Form.Switch
                    type="switch"
                    id={`custom-switch-${item._id}`}
                    checked={item.isVerified}
                    onClick={() => {
                      setCommentVerified(item._id, item.isVerified);
                      const selected = comments[commentIndex];
                      selected.isVerified = !comments[commentIndex].isVerified;
                      console.log(comments[commentIndex]);
                      comments[commentIndex] = selected;
                      console.log(comments[commentIndex]);
                      console.log(selected);
                    }}
                  />
                </Col>
                <Col md={1}>
                  <i
                    onClick={() => {
                      removeCommentsHandler(item._id, commentIndex);
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-danger fa fa-trash"
                  ></i>
                </Col>
              </Row>
              {item.replys.length !== 0 ? (
                <Col>
                  <h4>Replys</h4>
                  {item.replys.map((reply,replyIndex) => (
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
                            setReplyVerified(item._id,reply._id, reply.isVerified);
                            // const selected = comments[replyIndex];
                            // console.log(comments[replyIndex]);
                            // console.log(comments[replyIndex]);
                            const selected = item.replys[replyIndex]
                            selected.isVerified = !item.replys[replyIndex].isVerified;
                            item.replys[replyIndex] = selected;
                          }}
                        />
                      </Col>
                      <Col md={1}>
                        <i
                          onClick={() => {
                            removeReplysHandler(item._id,reply._id ,commentIndex,replyIndex);


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
          </>
        ))}
      </ListGroup>
    </>
  );
};
