import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

import Message from "../components/Message";
import loader from "../resources/loading.svg";
import { register } from "../store/actions/authActions";
import { Link } from "react-router-dom";

function RegisterScreen({ history, location }) {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.authenticationReducers
  );

  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/");
    }
  });

  const handleFormSubmit = (event) => {
    setErrorMessage("");
    event.preventDefault();
    const info = {
      email,
      password,
      first_name,
      last_name,
    };
    if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match");
    } else {
      dispatch(register(info));
    }
  };
  return (
    <>
      {error || errorMessage ? (
        <div style={{ textAlign: "center" }}>
          <Message variant="danger" children={error || errorMessage} />
        </div>
      ) : loading ? (
        <div style={{ textAlign: "center" }}>
          {console.log(loading)}
          <img src={loader} alt="Loading" title="Loading..."></img>
        </div>
      ) : null}
      <Container>
        <div id="title" className="mb-4">
          <img
            alt=""
            src={"/images/vast-logo.png"}
            width="200px"
            height="auto"
            className="d-inline-block align-top mb-3"
          />{" "}
          <h3>Welcome to <span style={{color: "#00bc8c"}}>Vastovers Online Medi Store</span></h3>
          <h5>Please Create an Account</h5>
        </div>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleFormSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>First and last name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="First Name"
                  aria-label="first-name"
                  value={first_name}
                  aria-describedby="basic-addon2"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FormControl
                  type="text"
                  placeholder="Last Name"
                  aria-label="last-name"
                  value={last_name}
                  aria-describedby="basic-addon2"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>

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
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <Form.Label htmlFor="basic-password" className="mb-1">
                Confirm password
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="basic-password"
                  type="password"
                  placeholder="Enter Your Password Again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputGroup>
              <Button type="submit" varinat="primary">
                REGISTER
              </Button>
            </Form>
            <Row className="py-3">
              <h5>
                Already a Customer ?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  SIGN IN
                </Link>
              </h5>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegisterScreen;
