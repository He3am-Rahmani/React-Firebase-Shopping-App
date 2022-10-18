import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Button,
  Modal,
  ModalBody,
  Spinner,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NfPage from "../404Page/nfPage";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetailAction,
  formatProductDetails,
} from "../../action/ProductAction";
import { createUseStyles } from "react-jss";
import Comments from "../../components/Comments/Comments";
import { addToCart } from "../../action/cartAction";
import axios from "axios";
import Reply from "../../components/Reply/Reply";
import { IoChevronBack } from "react-icons/io5";

const ProductPage = ({ history, match }) => {
  const [productMessage, setProductMessage] = useState("");
  const [productError, setProductError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  // const { currentUser } = useAuth();
  const commentRef = useRef("");
  const replyRef = useRef("");

  const [comments, setComments] = useState([]);

  const { productDetail } = useSelector((state) => state);
  const userData = useSelector((state) => state.currentUser);
  const { loading, product } = productDetail;

  const { currentUser } = userData;

  const useStyles = createUseStyles({
    backButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      "&:hover": {
        textDecoration: "none",
        color: "#e1e1e1e1e1",
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
      "@media(max-width:570px)": {
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
      "@media(max-width:570px)": {
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
      "@media(max-width:570px)": {
        gap: "4rem",
        justifyContent: "space-between",
      },
    },
    imageHolder: {
      width: "100%",
    },
    image: {
      width: "50%",
      height: "75%",
      "@media(max-width:570px)": {
        width: "100%",
      },
    },
  });

  if (
    error !== "" ||
    message !== "" ||
    productError !== "" ||
    productMessage !== ""
  )
    setTimeout(() => {
      setError("");
      setMessage("");
      setProductError("");
      setProductMessage("");
      setShowModal(false);
    }, 5000);

  const styles = useStyles();

  useEffect(() => {
    dispatch(productDetailAction(match.params.id));
    document.title = product.name;

    return () => {
      dispatch(formatProductDetails());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios
      .post(`https://no1-shop.herokuapp.com/api/comment/get-specefic`, {
        key: process.env.REACT_APP_API_KEY,
        product: product._id,
      })
      .then(({ data }) => {
        setComments(data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const addHandler = async () => {
    if (currentUser._id) {
      console.log(currentUser);
      const { data } = await dispatch(addToCart(currentUser._id, product));
      console.log(
        "AddToCartActionCalled Response In Product Component ==>",
        data
      );
      if (data.message.type === "success") {
        setProductMessage(data.message.message);
      } else {
        setError(data.message.message);
      }
    } else {
      setProductError(
        <>
          <p>
            For Add Products To Cart You Have To{" "}
            <Link to="/login">Login/Signup</Link>
          </p>
        </>
      );
    }
    // history.push(`/cart/${product._id}`);
  };

  const addCommentHandler = () => {
    if (currentUser._id) {
      if (commentRef.current.value !== "") {
        axios
          .post(`https://no1-shop.herokuapp.com/api/comment/create`, {
            key: process.env.REACT_APP_API_KEY,
            authorId: currentUser._id,
            author: currentUser.displayName,
            authorEmail: currentUser.email,
            body: commentRef.current.value,
            photoURL: currentUser.photoURL,
            product: product._id,
          })
          .then(({ data }) => {
            console.log(data);
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
      }
    } else {
      setError(
        <>
          <p style={{ margin: "0" }}>
            For Leaving Comments You Have To <Link to="/login">Login</Link>
          </p>
        </>
      );
    }
  };

  const addReplyHandler = (item) => {
    if (currentUser._id) {
      if (replyRef.current.value !== "") {
        axios
          .post(`https://no1-shop.herokuapp.com/api/comment/add-reply`, {
            key: process.env.REACT_APP_API_KEY,
            commentId: item._id,
            author: currentUser.displayName,
            commentAuthorId: item.authorId,
            authorId: currentUser._id,
            body: replyRef.current.value,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          })
          .then((response) => {
            console.log(response);
            // setShowModal(true);
            // setMessage(response.data.message.message);
            // replyRef.current.value = "";
          });
      } else {
        setError("Please Fill Out Reply Field To Reply");
      }
    } else {
      setError("For Leaving Reply You Have To login");
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
              <IoChevronBack /> Back To Home Page
            </Link>

            <div className={styles.content}>
              <div className={styles.split}>
                <div className={styles.imageHolder}>
                  <Image
                    className={styles.image}
                    style={{ marginTop: "3rem" }}
                    src={product.image}
                  />
                </div>
                {/* <Col md="7" sm="12"> */}
                <div className={styles.productsDescriptions}>
                  {productMessage && (
                    <Alert variant="success">{productMessage}</Alert>
                  )}
                  {productError && (
                    <Alert variant="danger">{productError}</Alert>
                  )}
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
                  <Modal.Title>
                    {error && <>Error</>}
                    {message && <>Success</>}
                  </Modal.Title>
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
                  {message && <Alert variant="success">{message}</Alert>}
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
                {comments.map((item) =>
                  item.isVerified ? (
                    <div>
                      <Comments
                        comment={item}
                        addReplyHandler={() => addReplyHandler(item)}
                        refs={{
                          replyRef: replyRef,
                        }}
                      >
                        {item.replys.length !== 0
                          ? item.replys.map((reply) =>
                              reply.isVerified ? <Reply reply={reply} /> : null
                            )
                          : null}
                      </Comments>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </div>
        ));
  }

  return show;
};

export default ProductPage;
