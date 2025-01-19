/* eslint-disable react/prop-types */
import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";


export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({})

  const [passwordMismatch, setPasswordMismatch] = useState();
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
        address,
        password,
      };
      register(newUser).then((user) => {
        if (user?.errors) {
          setErrors(user.errors)
          setRegistrationFailure(true)
        }
        else {
          
          navigate("/employee");
        }
      });
    }
  };

  return (
    <div className="container border border-3 bg-light bg-opacity-50 p-3 mb-3" style={{ maxWidth: "500px" }}>
      <h3>Sign Up</h3>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          invalid={!!errors.FirstName}
        />
        {errors.FirstName && <FormFeedback>{errors.FirstName.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          invalid={!!errors.LastName}
        />
        {errors.LastName && <FormFeedback>{errors.LastName.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          invalid={!!errors.Email}
        />
        {errors.Email && <FormFeedback>{errors.Email.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          type="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          invalid={!!errors.phoneNumber}
        />
        {errors.Email && <FormFeedback>{errors.phoneNumber.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>User Name</Label>
        <Input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          invalid={!!errors.UserName}
        />
        {errors.UserName && <FormFeedback>{errors.UserName.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          invalid={!!errors.Address}
        />
        {errors.Address && <FormFeedback>{errors.Address.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          invalid={passwordMismatch|| !!errors.Password}
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
        />
        {errors.Password && <FormFeedback>{errors.Password.join(", ")}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label> Confirm Password</Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
        />
        <FormFeedback>Passwords do not match!</FormFeedback>
      </FormGroup>
      <p style={{ color: "red" }} hidden={!registrationFailure}>
        Registration Failure
      </p>
      <Button
        color="primary"
        onClick={handleSubmit}
        disabled={passwordMismatch}
      >
        Register
      </Button>
      <p>
        Already signed up? Log in <Link to="/login">here</Link>
      </p>
    </div>
  );
}
