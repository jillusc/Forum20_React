import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      /* console.log(err); */
    }
  };

  const addPostIcon = (
    <NavLink className={styles.NavLink}
      activeClassName={styles.Active} to="/posts/create">
      <i className="fa-solid fa-circle-plus"></i>Add post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink}
        activeClassName={styles.Active} to="/feed">
        <i className="fa-solid fa-seedling"></i>Feed
      </NavLink>
      <NavLink className={styles.NavLink}
        activeClassName={styles.Active} to="/liked">
        <i className="fa-solid fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fa-solid fa-right-from-bracket"></i>Log out
      </NavLink>
      <div className={styles.profileWithAvatar}>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to={`/profiles/${currentUser?.profile_id}`}>
          <i className="fa-solid fa-user"></i>Profile
        <Avatar src={currentUser?.profile_image} height={50} />
        </NavLink>
      </div>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink}
        activeClassName={styles.Active} to="/login">
        <i className="fa-solid fa-right-to-bracket"></i>Log in
      </NavLink>
      <NavLink className={styles.NavLink}
        activeClassName={styles.Active} to="/signup">
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="65" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center">
            <NavLink exact className={styles.NavLink}
              activeClassName={styles.Active} to="/" >
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
