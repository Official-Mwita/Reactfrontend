import React, { Component }  from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ auth, changeAuthInfo }) {
  const loggedIn = auth.loggedIn;

  const logOut = () => {
    processLogout();
  };

  const processLogout = async () => {
    var _token = auth.csrfToken;
    let logoutData = { _token };
    try {
      const response = await fetch(auth.url + "/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + auth.token,
        },

        body: JSON.stringify(logoutData),
      });
      const data = await response.json();
      if (data.success) {
        //clear user data
        changeAuthInfo({
          ...auth,
          token: "",
          loggedIn: false,
          userName: "",
          fname: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    return (
      <Navbar collapseOnSelect expand="lg" className="pr-5 pl-5 shadow-sm">
        <Navbar.Brand href="" className="home-name">
          <span className="home-name">{auth.userName}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link eventKey={2}>
              <Button
                variant="success"
                style={{ width: 80 + "px" }}
                onClick={logOut}
              >
                Logout
              </Button>
            </Nav.Link>
            <Nav.Link href="">
              <Link to="/place-order">
                <Button bg="white" variant="light">
                  Place Order
                </Button>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="pr-5 pl-5 shadow-sm">
      <Navbar.Brand href="/">
        <span className="home-name">Home</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="">
            <Link to="/login">
              <Button variant="outline-success" style={{ width: 80 + "px" }}>
                Login
              </Button>
            </Link>
          </Nav.Link>

          <Nav.Link eventKey={2} href="">
            <Link to="/register">
              {" "}
              <Button variant="outline-success" style={{ width: 80 + "px" }}>
                Register
              </Button>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
