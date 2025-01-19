
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
    <Navbar className="nav-bg" light fixed="top" expand={false}>
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        <img 
          src="./src/assets/SewNash1.png" 
          alt="SewNash Logo" 
          className="img-fluid" 
          style={{ height: '80px' }} // Adjust height as needed
        />
        </NavbarBrand>
        
        <Nav className=" ms-auto" navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/employee">
                <Button  className="employee-btn">Employee</Button>
            </NavLink>
            </NavItem>
        </Nav>
    </Navbar>
    </div>
);
}