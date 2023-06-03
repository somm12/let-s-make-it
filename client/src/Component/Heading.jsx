import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Heading = () => {
  const [test, setTest] = useState(0);
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                to="/upload"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "5px",
                }}
              >
                Upload
              </Nav.Link>
              <Nav.Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "5px",
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: "5px",
                }}
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
