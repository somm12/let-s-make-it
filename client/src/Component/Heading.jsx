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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/upload"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Upload
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  List
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
