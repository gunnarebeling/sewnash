
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
        <img 
          src="./src/assets/SewNash1.png" 
          alt="SewNash Logo" 
          className="img-fluid" 
          style={{ height: '80px' }} // Adjust height as needed
        />
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