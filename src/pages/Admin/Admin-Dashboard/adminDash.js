/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import "./adminDash.css";
import { useSelector, useDispatch } from "react-redux";
import {
  productDetailAction,
  productListAction,
} from "../../../action/ProductAction";
import AdminHeader from "../Admin-Components/admin-Header/AdminHeader";
import {
  AddProduct,
  EditProducts,
  ViewProducts,
} from "./Dashboard-Components/Products";
import {
  AddAdmin,
  RemoveAdmin,
  ViewAdmins,
} from "./Dashboard-Components/Admins";
import {
  ViewAndDeleteDiscounts,
  AddDiscount,
} from "./Dashboard-Components/Discounts";
import { ViewAndEditReports } from "./Dashboard-Components/Reports";

export default function AdminDash({ history, match }) {
  let vue = <h1>hello</h1>;
  const addNameRef = useRef("");
  const priceRef = useRef("");
  const imageRef = useRef("");
  const DescRef = useRef("");

  const updateNameRef = useRef("");
  const updatePriceRef = useRef("");
  const updateImageRef = useRef("");
  const updateDescRef = useRef("");

  const addAdminNameRef = useRef("");
  const adminUserNameRef = useRef("");
  const adminRoleRef = useRef("");
  const adminPassRef = useRef("");

  const delAdminRef = useRef("");

  const addDiscNameRef = useRef("");
  const [perRange, setPerRange] = useState(0);

  const [operation, setOperation] = useState("ADD_PRODUCT");
  const [adminInfo, setAdminInfo] = useState({});
  const [adminList, setAdminList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState([]);
  const [disList, setDisList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { loading, products } = useSelector((state) => state.productList);

  if (error !== "" || message !== "") {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2500);
  }

  // useEffect For Sending Http Request And Seting Initial Values

  useEffect(() => {
    dispatch(productListAction());

    axios
      .post(`http://localhost:8000/api/tocken/get-admin/`, {
        url: history.location.state,
      })
      .then((response) => {
        if (response.data.message.type === "success") {
          setAdminInfo(response.data.data);
        } else {
          exitAdminPanel();
        }
      });

    axios
      .post(`http://localhost:8000/api/admin/get-admins`, {
        key: process.env.REACT_APP_API_KEY,
      })
      .then((response) => {
        setAdminList(response.data.data);
      });

    axios
      .post(`http://localhost:8000/api/ticket/get-all`, {
        key: process.env.REACT_APP_API_KEY,
      })
      .then((response) => {
        setTicket(response.data.data);
      })
      .catch((err) => {
        setError(err);
      });

    axios
      .post(`http://localhost:8000/api/discount/get-all`, {
        key: process.env.REACT_APP_API_KEY,
      })
      .then((response) => {
        setDisList(response.data.data);
      });

    if (document.querySelector("#nav-p")) {
      document.querySelector("#nav-p").style.display = "none";
    }

    if (document.querySelector("footer")) {
      document.querySelector("footer").style.display = "none";
    }

    document.querySelector("#main-cont").classList = "";
  }, [dispatch, history, match]);

  // Functions

  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      addNameRef.current.value.trim() === "" ||
      imageRef.current.value.trim() === "" ||
      DescRef.current.value.trim() === "" ||
      priceRef.current.value.trim() === ""
    ) {
      setError("Please Fill Out All Filds For This Operation");
    } else {
      axios
        .post(`http://localhost:8000/api/products/create`, {
          key: process.env.REACT_APP_API_KEY,
          name: addNameRef.current.value.trim(),
          image: imageRef.current.value.trim(),
          description: DescRef.current.value.trim(),
          price: priceRef.current.value.trim(),
        })
        .then((response) => {
          if (response.data.message.type === "success") {
            setMessage(response.data.message.message);
          } else {
            setError(response.data.message.message);
          }
          dispatch(productListAction());
        })
        .catch((err) => setError("Operation Failur Cause " + err));
    }
  };
  const removeProductHandler = (productName, removedItemComponent, index) => {
    // removing without refresh TEST HERE
    axios
      .post(`http://localhost:8000/api/products/remove`, {
        key: process.env.REACT_APP_API_KEY,
        name: productName,
      })
      .then((response) => {
        if (response.data.message.type === "success") {
          setMessage(response.data.message.message);

          /// adding className For animation

          removedItemComponent.className = "removed-item";
          const position = window.pageYOffset + 100;

          // using 1.async await because we need to wait for result then change the view data
          // 2.need something to check products changing event

          const waiting = async () => {
            await dispatch(productListAction());
            window.scrollTo(position, position);
          };

          /// for showing delete fade out animation
          setTimeout(() => {
            waiting();
          }, 900);
        } else {
          setError(response.data.message.message);
        }
      })
      .catch((err) => setError("Operation Failur Cause " + err));
  };
  const updateProdHandler = (id) => {
    let name = updateNameRef.current.value,
      price = updatePriceRef.current.value,
      image = updateImageRef.current.value,
      description = updateDescRef.current.value;

    name !== ""
      ? (name = updateNameRef.current.value)
      : (name = selectedProduct.name);
    price === 0
      ? (price = selectedProduct.price)
      : (price = updatePriceRef.current.value);
    image.length !== 0
      ? (image = selectedProduct.image)
      : (image = updateImageRef.current.value);
    description.length !== 0
      ? (description = selectedProduct.description)
      : (description = updateDescRef.current.value);

    price
      ? (price = updatePriceRef.current.value)
      : (price = selectedProduct.price);
    image
      ? (image = updateImageRef.current.value)
      : (image = selectedProduct.image);
    description
      ? (description = updateDescRef.current.value)
      : (description = selectedProduct.description);
    console.log(name, price, image, description);

    axios
      .put(`http://localhost:8000/api/products/update`, {
        key: process.env.REACT_APP_API_KEY,
        prodId: id,
        name: name,
        price: price,
        image: image,
        description: description,
      })
      .then((response) => {
        if (response.data.message.type === "success") {
          setMessage(response.data.message.message);
          dispatch(productListAction());
          dispatch(productDetailAction());
        } else {
          setError(response.data.message.message);
        }
      });
  };

  const addAdminHandler = () => {
    if (
      addAdminNameRef.current.value.trim() === "" ||
      adminRoleRef.current.value.trim() === "" ||
      adminUserNameRef.current.value.trim() === "" ||
      adminPassRef.current.value.trim() === ""
    ) {
      setError("Please Fill Out All Filds For This Operation");
    } else {
      axios
        .post(`http://localhost:8000/api/admin/create`, {
          key: process.env.REACT_APP_API_KEY,
          name: addAdminNameRef.current.value.trim(),
          role: adminRoleRef.current.value.trim(),
          userName: adminUserNameRef.current.value.trim(),
          password: adminPassRef.current.value.trim(),
          createdBy: adminInfo.userName,
          creatorRole: adminInfo.role,
        })
        .then((response) => {
          if (response.data.message.type === "success") {
            axios
              .post(`http://localhost:8000/api/admin/get-admins`, {
                key: process.env.REACT_APP_API_KEY,
              })
              .then((response) => {
                setAdminList(response.data.data);
              });
            setMessage(response.data.message.message);
          } else {
            setError(response.data.message.message);
          }
          dispatch(productListAction());
        })
        .catch((err) => setError("Operation Failur Cause " + err));
    }
  };
  const removeAdminHandler = (e) => {
    e.preventDefault();
    if (delAdminRef.current.value === "") {
      setError(
        "We Need Username For This Operation You Can Find It In 'View Admin' Tab "
      );
    } else {
      axios
        .post(`http://localhost:8000/api/admin/remove/`, {
          key: process.env.REACT_APP_API_KEY,
          userName: delAdminRef.current.value,
          controllerAdmin: adminInfo.userName,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message.type === "success") {
            axios
              .post(`http://localhost:8000/api/admin/get-admins/`, {
                key: process.env.REACT_APP_API_KEY,
              })
              .then((response) => {
                setAdminList(response.data.data);
              });
            setMessage(response.data.message.message);
          } else {
            setError(response.data.message.message);
          }
        })
        .catch((err) => setError("Operation Failur Cause " + err));
    }
  };

  const delTicketHandler = (id) => {
    axios
      .post(`http://localhost:8000/api/ticket/del`, {
        key: process.env.REACT_APP_API_KEY,
        id: id,
      })
      .then((response) => {
        if (response.data.message.type === "success") {
          setTicket(response.data.data.data);
          setMessage(response.data.message.message);
        } else {
          setError(response.data.message.message);
        }
      })
      .catch((err) => setError("Operation Failur Cause " + err));
  };

  const addDiscHandler = (e) => {
    e.preventDefault();
    if (perRange === 0 && addDiscNameRef.current.value !== "") {
      setError("Discount Code Cant Be 0%");
    } else {
      if (addDiscNameRef.current.value === "" && perRange !== 0) {
        setError("We Need A Name For Discount Code");
      } else {
        if (addDiscNameRef.current.value === "" && perRange === 0) {
          setError("Fill Out Fields");
        } else {
          axios
            .post(`http://localhost:8000/api/discount/create`, {
              key: process.env.REACT_APP_API_KEY,
              name: addDiscNameRef.current.value.trim(),
              value: perRange,
            })
            .then((response) => {
              if (response.data.message.type === "success") {
                setMessage(response.data.message.message);
                setDisList(response.data.data);
              } else {
                setError(response.data.message.message);
              }
            });
        }
      }
    }
  };

  const delDisHandler = (id) => {
    axios
      .post(`http://localhost:8000/api/discount/remove`, {
        key: process.env.REACT_APP_API_KEY,
        id: id,
      })
      .then((response) => {
        if (response.data.message.type === "success") {
          setMessage(response.data.message.message);
          setDisList(response.data.data);
        } else {
          setError(response.data.message.message);
        }
      })
      .catch((err) => setError("Operation Failur Cause " + err));
  };

  const exitAdminPanel = () => {
    document.querySelector("#nav-p").style.display = "block";
    document.querySelector("footer").style.display = "block";
    document.querySelector("#main-cont").classList = "container";
    axios.put(`http://localhost:8000/api/tocken/used/${match.params.tocken}`);
    history.push("/admin");
  };

  let OnlySA;

  // Check AdminRole For Showing Admin RoleBase Content

  if (adminInfo.role === "Admin") {
    // eslint-disable-next-line jsx-a11y/heading-has-content
    OnlySA = <h1></h1>;
  } else if (
    adminInfo.role === "Senior Admin" ||
    adminInfo.role === "Head Admin"
  ) {
    OnlySA = (
      <>
        <DropdownButton
          as={ButtonGroup}
          id="dropdown-button-drop-right"
          drop="right"
          variant="dark"
          title="Admins"
          style={{ zIndex: 100, marginTop: "1rem" }}
        >
          <Dropdown.Item
            onClick={() => {
              setOperation("ADD_ADMIN");
            }}
            style={{
              color: "#fff",
              width: "100%",
              margin: "0",
              padding: "0",
            }}
            className="btn btn-dark view-btn"
          >
            <Button
              onClick={() => {
                setOperation("ADD_ADMIN");
              }}
              style={{ color: "#fff", width: "100%" }}
              className="btn btn-dark view-btn"
            >
              Add Admin
            </Button>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setOperation("REMOVE_ADMIN");
            }}
            style={{
              width: "100%",
              margin: 0,
              marginTop: "3px",
              padding: "0",
            }}
            className="btn btn-dark view-btn"
          >
            <Button
              onClick={() => {
                setOperation("REMOVE_ADMIN");
              }}
              style={{ color: "#fff", width: "100%" }}
              className="btn btn-dark view-btn"
            >
              Remove Admin
            </Button>
          </Dropdown.Item>
          {adminInfo.role === "Senior Admin" ? (
            <>
              <Dropdown.Item
                onClick={() => {
                  setOperation("VIEW_ADMINS");
                }}
                style={{
                  width: "100%",
                  margin: 0,
                  marginTop: "3px",
                  padding: "0",
                }}
                className="btn btn-dark view-btn"
              >
                <Button
                  onClick={() => {
                    setOperation("VIEW_ADMINS");
                  }}
                  style={{ color: "#fff", width: "100%" }}
                  className="btn btn-dark view-btn"
                >
                  View Admins
                </Button>
              </Dropdown.Item>
            </>
          ) : (
            <></>
          )}
        </DropdownButton>
      </>
    );
  }

  // Requested Operation

  switch (operation) {
    case "ADD_PRODUCT":
      vue = (
        <AddProduct
          error={error}
          message={message}
          addProductHandler={addProductHandler}
          refs={{
            addNameRef: addNameRef,
            priceRef: priceRef,
            DescRef: DescRef,
            imageRef: imageRef,
          }}
        />
      );

      break;
    case "VIEW_PRODUCTS":
      vue = (
        <ViewProducts
          setOperation={setOperation}
          setSelectedProduct={setSelectedProduct}
          products={products}
          removeProductHandler={removeProductHandler}
        />
      );

      break;
    case "EDIT_PRODUCTS":
      vue = (
        <EditProducts
          error={error}
          message={message}
          refs={{
            updateNameRef: updateNameRef,
            updatePriceRef: updatePriceRef,
            updateImageRef: updateImageRef,
            updateDescRef: updateDescRef,
          }}
          selectedProduct={selectedProduct}
          setOperation={setOperation}
          updateProdHandler={updateProdHandler}
        />
      );

      break;
    case "VIEW_ADMINS":
      vue = <ViewAdmins adminList={adminList} />;

      break;
    case "ADD_ADMIN":
      vue = (
        <AddAdmin
          error={error}
          message={message}
          refs={{
            addAdminNameRef: addAdminNameRef,
            adminUserNameRef: adminUserNameRef,
            adminRoleRef: adminRoleRef,
            adminPassRef: adminPassRef,
          }}
          addAdminHandler={addAdminHandler}
          adminInfo={adminInfo}
        />
      );

      break;
    case "REMOVE_ADMIN":
      vue = (
        <RemoveAdmin
          error={error}
          message={message}
          refs={{ delAdminRef: delAdminRef }}
          removeAdminHandler={removeAdminHandler}
        />
      );

      break;
    case "TICKET":
      vue = (
        <ViewAndEditReports
          error={error}
          message={message}
          ticket={ticket}
          delTicketHandler={delTicketHandler}
        />
      );
      break;
    case "VI_DEL_DISCOUNT":
      vue = (
        <ViewAndDeleteDiscounts
          error={error}
          message={message}
          disList={disList}
          delDisHandler={delDisHandler}
        />
      );
      break;
    case "ADD_DISCOUNT":
      vue = (
        <AddDiscount
          error={error}
          message={message}
          refs={{ addDiscNameRef: addDiscNameRef }}
          perRange={perRange}
          setPerRange={setPerRange}
          addDiscHandler={addDiscHandler}
        />
      );
      break;
    default:
      break;
  }

  return (
    <>
      <AdminHeader exitAdmin={exitAdminPanel} adminInfo={adminInfo} />
      <div style={{ margin: "2rem 0rem" }}>
        <div
          style={{
            gap: "2rem",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
          className="view d-flex"
        >
          <div
            style={{ gap: "1rem" }}
            className="side-bar w-25 d-flex flex-column"
          >
            <DropdownButton
              as={ButtonGroup}
              id="dropdown-button-drop-right"
              drop="right"
              variant="info"
              title="Products"
              style={{ zIndex: 100, borderRadius: "5px" }}
            >
              <Dropdown.Item
                onClick={() => {
                  setOperation("ADD_PRODUCT");
                }}
                style={{
                  color: "#fff",
                  width: "100%",
                  margin: "0",
                  padding: "0",
                }}
                className="btn btn-dark view-btn"
              >
                <Button
                  variant="success"
                  style={{ width: "100%", backgroundColor: "#52b788" }}
                >
                  Add Product
                </Button>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOperation("VIEW_PRODUCTS");
                }}
                style={{
                  width: "100%",
                  margin: 0,
                  marginTop: "3px",
                  padding: "0",
                }}
                className="btn btn-dark view-btn"
              >
                <Button
                  variant="primary"
                  style={{
                    width: "100%",
                    color: "#fff",
                    backgroundColor: "#5d98d3",
                  }}
                >
                  View & Edit Products
                </Button>
              </Dropdown.Item>
            </DropdownButton>

            <Button
              onClick={() => {
                setOperation("TICKET");
              }}
              style={{ color: "#fff" }}
              className="btn btn-secondary view-btn"
            >
              Reports
            </Button>
            <DropdownButton
              as={ButtonGroup}
              id="dropdown-button-drop-right"
              drop="right"
              variant="danger"
              title="Discount"
              style={{ zIndex: 100, backgroundColor: "#D20000" }}
            >
              <Dropdown.Item
                onClick={() => {
                  setOperation("ADD_DISCOUNT");
                }}
                style={{
                  color: "#fff",
                  width: "100%",
                  margin: "0",
                  padding: "0",
                }}
                className="btn btn-warning view-btn"
              >
                <Button
                  variant="success"
                  style={{
                    color: "#fff",
                    width: "100%",
                    backgroundColor: "#003FD1",
                  }}
                >
                  Add Discount
                </Button>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOperation("VI_DEL_DISCOUNT");
                }}
                style={{
                  color: "#fff",
                  width: "100%",
                  margin: 0,
                  marginTop: "3px",
                  padding: "0",
                }}
                className="btn btn-warning view-btn"
              >
                <Button
                  variant="danger"
                  style={{
                    color: "#fff",
                    width: "100%",
                    backgroundColor: "#36036D",
                    border: "0",
                  }}
                >
                  View & Delete
                </Button>
              </Dropdown.Item>
            </DropdownButton>

            {OnlySA}
          </div>
          <div className="w-50">{vue}</div>
        </div>
      </div>
    </>
  );
}
