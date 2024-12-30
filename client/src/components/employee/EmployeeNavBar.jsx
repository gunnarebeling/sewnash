
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
} from "reactstrap";

import { useContext } from "react";
import { UserContext } from "../../App";
import { logout } from "../../managers/authManager";


export default function EmployeeNavBar() {
    const { setLoggedInUser} = useContext(UserContext)

    return (
        <div>
        <Navbar color="light" light fixed="true" expand={true}>
            <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
            sewnash
            </NavbarBrand>
            
            <Nav navbar>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/employee">
                        Bookings
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="classes">
                        Classes
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} to="/">
                    Customer
                    </NavLink>
                </NavItem>
                <Button
                color="primary"
                onClick={(e) => {
                    e.preventDefault();
                    logout().then(() => {
                    setLoggedInUser(null)
                    
                    ;
                    });
                }}
                >
                Logout
                </Button>
            
            </Nav>
        </Navbar>
        </div>
    );
}