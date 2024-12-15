import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
} from "reactstrap";


export default function EmployeeNavBar() {
return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        sewnash
        </NavbarBrand>
        
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/employee">
                <Button color="primary">Employee</Button>
            </NavLink>
            </NavItem>
        </Nav>
    </Navbar>
    </div>
);
}