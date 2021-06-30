import React, { useEffect } from "react";
import {
  Nav,
  Navbar,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useHistory } from "react-router";

import "./AdminHeader.css";

const AdminHeader = (props) => {
  const history = useHistory();
  const { adminInfo } = props;

  useEffect(() => {}, [history]);

  return (
    <header id="nav" className="admin-nav-parent">
      <Navbar className="nav" variant="dark">
        <Container>
          <Navbar.Brand className="logo">AdMin Panel</Navbar.Brand>
          <Nav style={{ gap: "1rem" }}>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  Name: {adminInfo.name}
                  <br />
                  Role: {adminInfo.role}
                </Tooltip>
              }
            >
              <Nav.Link>
                <i className="pad">{adminInfo.userName}</i>
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-bottom`}>Logout AdminPanel</Tooltip>
              }
            >
              <Nav.Link onClick={props.exitAdmin}>
                <i id="home" className="fa fa-sign-out"></i>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
