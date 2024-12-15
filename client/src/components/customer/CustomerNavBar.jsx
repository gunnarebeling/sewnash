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


export default function CustomerNavBar() {
return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        sewnash
        </NavbarBrand>
        
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Employee Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
    </Navbar>
    </div>
);
}