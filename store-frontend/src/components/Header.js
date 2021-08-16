import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaPills, FaTablets } from "react-icons/fa";
import {
  RiMedicineBottleFill,
  RiHome2Line,
  RiSettings4Line,
} from "react-icons/ri";
import { CgProfile, CgShoppingCart, CgPlayListAdd } from "react-icons/cg";
import { DEAUTHENTICATE } from "../store/actionTypes";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state) => state.authenticationReducers
  );
  
  return (
    <header className="navbar-header mb-4">
      <Navbar bg="dark" expand="lg" className="navbar navbar-dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src={"/images/vast-logo.png"}
                width="auto"
                height="35"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>
                  <RiHome2Line /> <span />
                  Home
                </Nav.Link>
              </LinkContainer>
              <NavDropdown id="basic-nav-dropdown" title="Categories">
                <LinkContainer to="/liquid-drugs">
                  <NavDropdown.Item>
                    <RiMedicineBottleFill />
                    <span />
                    Liquid Drugs
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/tablets-category">
                  <NavDropdown.Item href="/">
                    <FaTablets /> <span />
                    Tablets
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pills-category">
                  <NavDropdown.Item href="/">
                    <FaPills /> <span />
                    Pills
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <CgProfile /> <span />
            <Nav>
              <NavDropdown
                title={user && user.name ? user.name : "Profile"}
                id="basic-nav-dropdown"
              >
                {isAuthenticated ? (
                  <LinkContainer to="profile">
                    <NavDropdown.Item>
                      <RiSettings4Line /> <span /> Profile Settings
                    </NavDropdown.Item>
                  </LinkContainer>
                ) : null}
                <LinkContainer to="/cart">
                  <NavDropdown.Item>
                    <CgShoppingCart /> <span /> Cart
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="wishlist">
                  <NavDropdown.Item>
                    <CgPlayListAdd /> <span /> Wishlist
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                {isAuthenticated ? (
                  <LinkContainer
                    to="/"
                    onClick={() => {
                      dispatch({
                        type: DEAUTHENTICATE,
                      });
                    }}
                  >
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                ) : (
                  <LinkContainer to="/login">
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
