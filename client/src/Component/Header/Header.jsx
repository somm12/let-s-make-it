import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import firebase from "../../firebase";
import style from "./Header.module.scss";

const Heading = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const logOut = () => {
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <div className={style.headerWrapper}>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Let's Make It!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/upload"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "5px",
                }}
              >
                Upload
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "5px",
                }}
              >
                Home
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            className="loginNavbar"
            style={{ justifyContent: "end" }}
          >
            {user.accessToken ? (
              <>
                <Navbar.Text
                  onClick={logOut}
                  style={{ color: "white", cursor: "pointer" }}
                >
                  LogOut
                </Navbar.Text>
                <Link
                  to="/mypage"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                  }}
                >
                  MyPage
                </Link>
                <Link
                  to="/bookmark"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                  }}
                >
                  Bookmark
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "5px",
                }}
              >
                Login
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
