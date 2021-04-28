import React from "react";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import './Account.css'

const Account = () => {
  return (
    <div>
      <Container>
        <Row>
            <h1 className='login-logo'>Login</h1>
          <Col className='input-group-od'>
            <InputGroup className='mb-3' >
              <InputGroup.Prepend>
                <FormControl placeholder='Username' />
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className='mb-3' >
              <InputGroup.Prepend>
                <FormControl placeholder='Email'/>
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className='mb-3' >
              <InputGroup.Prepend>
                <FormControl placeholder='Password' type='password' />
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup>
                <button className='login-btn'>
                  Login
                </button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Account;
