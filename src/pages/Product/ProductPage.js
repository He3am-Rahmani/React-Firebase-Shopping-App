import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Image,
  Button,
  ListGroup,
  Modal,
  ModalBody,
  Spinner,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NfPage from "../404Page/nfPage";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productDetailAction } from "../../action/ProductAction";
import { createUseStyles } from "react-jss";
import { useAuth } from "../../contexts/AuthContext";
import Comments from "../../components/Comments/Comments";

import "./ProductPage.css";
import axios from "axios";
import Reply from "../../components/Reply/Reply";

const ProductPage = ({ history, match }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const commentRef = useRef("");
  const replyRef = useRef("");

  const [comments, setComments] = useState([]);
  const [replys, setReplys] = useState([]);

  const productDetail = useSelector((state) => state.productDetail);

  const { loading, product } = productDetail;

  const useStyles = createUseStyles({
    backButton: {
      "&:hover": {
        textDecoration: "none",
        color: "#000",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "10rem",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    comments: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "space-between",
    },
    commentsLabel: {
      fontSize: "1.5rem",
    },
    addComment: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
    },
    commentInput: { border: "none", boxShadow: "0 0 2px 2px rgba(0,0,0,0.05)" },
    split: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      // display: "flex",
      // flexDirection: "row",
      // justifyItems: "space-between",
      gap: "2rem",
      alignItems: "center",
      // alignContent:'center',
      "@media(max-width:430px)": {
        flexDirection: "column",
      },
    },
    productsDescriptions: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: ".5rem",
      width: "50%",
      "@media(max-width:430px)": {
        gap: "2rem",
        justifyContent: "center",
        width: "100%",
      },
    },
    description: {
      width: "75%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      alignContent: "center",
      "&:last-child": {
        justifyContent: "center",
        marginTop: "3rem",
      },
      "@media(max-width:430px)": {
        gap: "4rem",
        justifyContent: "space-between",
      },
    },
    image: {
      width: "75%",
      height: "75%",
      "@media(max-width:430px)": {
        width: "100%",
      },
    },
  });

  const styles = useStyles();

  useEffect(() => {
    dispatch(productDetailAction(match.params.id));
    document.title = product.name;

    axios
      .post(`https://rocky-lake-08170.herokuapp.com/api/comment/get-specefic`, {
        key: process.env.REACT_APP_API_KEY,
        product: product._id,
      })
      .then(({ data }) => {
        setComments(data.data);
      });
  }, [match, dispatch, product.name, product._id]);

  const addHandler = () => {
    setMessage("Product Added To your Cart Successfully");
    history.push(`/cart/${product._id}`);
  };

  const addCommentHandler = () => {
    if (currentUser) {
      if (commentRef.current.value !== "") {
        axios
          .post(`https://rocky-lake-08170.herokuapp.com/api/comment/create`, {
            key: process.env.REACT_APP_API_KEY,
            author: currentUser.displayName,
            authorEmail: currentUser.email,
            body: commentRef.current.value,
            photoURL: currentUser.photoURL,
            product: product._id,
          })
          .then(({ data }) => {
            setShowModal(true);
            if (data.message.type === "success") {
              setMessage(data.message.message);
              commentRef.current.value = "";
            } else {
              setMessage(data.message.message);
            }
          });
      } else {
        setError("Fill Out All Fields");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } else {
      setShowModal(true);
      setError("For Leaving Comments You Have To login");
    }
  };

  const addReplyHandler = (item) => {
    if (currentUser) {
      console.log(replyRef.current);
      if (replyRef.current.value !== "") {
        console.log("sending Data Called");
        axios
          .post(
            `https://rocky-lake-08170.herokuapp.com/api/comment/add-reply`,
            {
              key: process.env.REACT_APP_API_KEY,
              commentId: item._id,
              author: currentUser.displayName,
              body: replyRef.current.value,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            }
          )
          .then((response) => {
            setShowModal(true);
            setMessage(response.data.message.message);
            replyRef.current.value = "";
          });
      } else {
        setError("Please Fill Out Reply Field To Reply");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } else {
      setShowModal(true);
      setError("For Leaving Comments You Have To login");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setError("");
    setMessage("");
  };
  let show = <NfPage />;
  if (!product) {
    show = <NfPage />;
  } else {
    loading
      ? (show = (
          <Modal
            size="sm"
            style={{
              textAlign: "center",
              width: "100%",
            }}
            show={loading}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <ModalBody
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading Product Details...
            </ModalBody>
          </Modal>
        ))
      : (show = (
          <div>
            <Link className={styles.backButton} to="/">
              <i className="back-btn fa fa-arrow-left"></i> Back To Home Page
            </Link>

            <div className={styles.content}>
              <div className={styles.split}>
                <div className={styles.imageHolders}>
                  <Image
                    className={styles.image}
                    style={{ marginTop: "3rem" }}
                    src={product.image}
                  />
                </div>
                {/* <Col md="7" sm="12"> */}
                <div className={styles.productsDescriptions}>
                  {message && <Alert variant="success">{message}</Alert>}
                  <div className={styles.description}>
                    <h5>
                      <strong>Name:</strong>
                    </h5>
                    {product.name}
                  </div>

                  <div className={styles.description}>
                    <h5>
                      <strong>Price:</strong>{" "}
                    </h5>
                    {product.price} Mil
                  </div>

                  <div className={styles.description}>
                    <h5>
                      <strong>Description:</strong>
                    </h5>
                    {product.description}
                  </div>
                  {/* <div className={styles.description} variant="flush"> */}
                  <div className={styles.description}>
                    <Button className="btn btn-secondary" onClick={addHandler}>
                      Add To Cart
                    </Button>
                  </div>
                  {/* </div> */}
                </div>
                {/* </Col> */}
              </div>
              <Modal
                show={showModal}
                onHide={handleClose}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Comment Submitted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {message && <Alert variant="success">{message}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className={styles.comments}>
                <div className={styles.commentsLabel}>Comments</div>
                <div className={styles.addComment}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Control
                    as="textarea"
                    className={styles.commentInput}
                    placeholder="Leave a Comment!"
                    ref={commentRef}
                  />{" "}
                  <Button
                    className={styles.addCommentBtn}
                    onClick={addCommentHandler}
                  >
                    Post
                  </Button>
                </div>
                {comments.map((item) => {
                  if (item.isVerified) {
                    return (
                      <div>
                        <Comments
                          refChange={() => {
                            console.log(replyRef.current.value);
                          }}
                          comment={item}
                          addReplyHandler={() => addReplyHandler(item)}
                          refs={{
                            replyRef: replyRef,
                          }}
                        >
                          {item.replys.length !== 0
                            ? item.replys.map((reply) =>
                                reply.isVerified ? (
                                  <Reply reply={reply} />
                                ) : null
                              )
                            : null}
                        </Comments>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ));
  }

  return show;
};

export default ProductPage;
