import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Form, InputGroup, Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import loader from "../resources/loading.svg";
import { login } from "../store/actions/authActions";
import { Link } from "react-router-dom";

function LoginScreen({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { error, loading } = useSelector(
    (state) => state.authenticationReducers
  );
  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/cart");
    }
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const info = {
      username: email,
      password: password,
    };
    dispatch(login(info));
  };
  return (
    <div>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <img src={loader} alt="Loading" title="Loading..."></img>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center" }}>
          <Message variant="danger" children={error} />
        </div>
      ) : null}
      <Container>
        <div className="mb-3" id="title">
          <img
            alt=""
            src={"/images/vast-logo.png"}
            width="200px"
            height="auto"
            className="d-inline-block align-top mb-3"
          />{" "}
          <h4>Welcome Back Customer, <span style={{color: "#00bc8c"}}>Sign in to Continue</span></h4>
        </div>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <>
              <Form onSubmit={handleFormSubmit}>
                <Form.Label htmlFor="basic-email" className="mb-1">
                  E-Mail
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="basic-email"
                    type="email"
                    placeholder="Enter a valid E-Mail"
                    aria-label="email"
                    value={email}
                    aria-describedby="basic-addon2"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">
                      @example.com
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>

                <Form.Label htmlFor="basic-password" className="mb-1">
                  password
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="basic-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>

                <Button type="submit" varinat="primary">
                  SIGN IN
                </Button>
              </Form>
              <Row className="py-3">
                <h5>
                  New Customer ?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : `/register`
                    }
                  >
                    Register
                  </Link>
                </h5>
              </Row>
            </>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginScreen;
