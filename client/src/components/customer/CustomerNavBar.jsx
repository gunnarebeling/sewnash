
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
} from "reactstrap";
import './CustomerNavBar.css'


export default function CustomerNavBar() {
return (
    <div >
    <Navbar className="nav-bg" light fixed="true" expand={false}>
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