import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth, logout } from "../actions/authActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
          <NavbarBrand
            style={{ cursor: "pointer" }}
            className="font-weight-bold"
          >
        <Link to="/">
            <img src="../../logo.jpg" alt="logo" width="100px"/>
        </Link>
          </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link to="/register">
                    <NavLink style={{ cursor: "pointer" }}>Register</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/login">
                    <NavLink style={{ cursor: "pointer" }}>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/contact">
                    <NavLink style={{ cursor: "pointer" }}>Contact Us</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link to="/user">
                  <NavLink style={{ cursor: "pointer" }}>{`${
                    isAuth().name
                  }'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link to="/admin">
                  <NavLink style={{ cursor: "pointer" }}>{`${
                    isAuth().name
                  }'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => logout(() => history.push("/signin"))}
                >
                  SignOut
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Header);
