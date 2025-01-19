
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
Collapse,
} from "reactstrap";

import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { logout } from "../../managers/authManager";
import './EmployeeNavBar.css'


export default function EmployeeNavBar() {
    const { loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="light" light expand="md" fixed="top">
      <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        <img 
          src="./src/assets/SewNash1.png" 
          alt="SewNash Logo" 
          className="img-fluid" 
          style={{ height: '80px' }} 
        />
      </NavbarBrand>

      {/* Toggler for smaller screens */}
      <NavbarToggler onClick={toggleNavbar} />

      {/* Collapsible part of the navbar */}
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mx-auto d-flex justify-content-center " navbar>
          <NavItem className="mx-3">
            <NavLink tag={RRNavLink} onClick={toggleNavbar} to="/employee">
              Bookings
            </NavLink>
          </NavItem>
          <NavItem className="mx-3">
            <NavLink tag={RRNavLink} onClick={toggleNavbar} to="classes">
              Classes
            </NavLink>
          </NavItem>
          <NavItem className="mx-3">
            <NavLink tag={RRNavLink}  onClick={toggleNavbar} to="/">
              Customer
            </NavLink>
          </NavItem>
          {loggedInUser.roles?.some(r => r === "Admin") && 
            <NavItem className="mx-3">
              <NavLink tag={RRNavLink} onClick={toggleNavbar} to="/register">
                Register Employee
              </NavLink>
            </NavItem>
          }
          </Nav>
          <Nav className="ms-auto">

            <NavItem>
                <Button
                className="logout-btn"
                onClick={(e) => {
                    e.preventDefault();
                    logout().then(() => {
                    setLoggedInUser(null);
                    });
                }}
                >
                Logout
                </Button>
            </NavItem>
          </Nav>
      </Collapse>
    </Navbar>
  );
}