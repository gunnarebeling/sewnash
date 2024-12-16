/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";

import { Spinner } from "reactstrap";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Login } from "./components/auth/Login";
import {Register} from "./components/auth/Register"
import { tryGetLoggedInUser } from "./managers/authManager";
import { EmployeeRoutes } from "./components/employee/EmployeeRoutes";
import { CustomerRoutes } from "./components/customer/CustomerRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route path="/" element={<CustomerRoutes/>}/> 
      <Route path="/employee/*" element= {
        <AuthorizedRoute loggedInUser={loggedInUser}>
          <EmployeeRoutes/>
        </AuthorizedRoute>
      }
      />
      <Route
        path="login"
        element={<Login setLoggedInUser={setLoggedInUser} />}
      />
      <Route
        path="register"
        element={<Register setLoggedInUser={setLoggedInUser} />}
      />

    </Routes>
  );
}