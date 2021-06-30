import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import "./AdminFooter.css";

const AdminFooter = ({ adminInfo }) => {
  return (
    <React.Fragment>
      <footerr className="footer">
        <Col>
          <div className="footer-display">
            <Col>
              <div className="footer-icon-hold">
                <Col className="footer-icon-holder">
                  Name:<i>{adminInfo.name}</i>
                </Col>
                <Col className="footer-icon-holder">
                  UserName: <i>{adminInfo.userName}</i>
                </Col>
                <Col className="footer-icon-holder">
                  Role: <i>{adminInfo.role}</i>
                </Col>
              </div>
            </Col>
          </div>
        </Col>
      </footerr>
    </React.Fragment>
  );
};

export default AdminFooter;
