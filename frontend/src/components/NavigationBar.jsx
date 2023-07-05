import React from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import "./Screen.css";

const NavigationBar = ({ setSearch }) => {
  return (
    <Navbar className="nav-color" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>Note App</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <>
              <Nav.Link href="/notes">My Notes</Nav.Link>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
