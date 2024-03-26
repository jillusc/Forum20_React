import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="65" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mt-4 text-left">
            <NavLink exact className={styles.NavLink}
              activeClassName={styles.Active} to="/" >
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
            <NavLink className={styles.NavLink}
              activeClassName={styles.Active} to="/login">
              <i className="fa-solid fa-right-to-bracket"></i>Log in
            </NavLink>
            <NavLink className={styles.NavLink}
              activeClassName={styles.Active} to="/signup">
              <i className="fa-solid fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;