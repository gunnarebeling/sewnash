/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "../managers/authManager";
import { Spinner } from "reactstrap";
import { EmployeeRoutes } from "./employee/EmployeeRoutes";
import { CustomerRoutes } from "./customer/CustomerRoutes";


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
      <CustomerRoutes/>  
      <AuthorizedRoute loggedInUser={loggedInUser}>
        <EmployeeRoutes/>
      </AuthorizedRoute>
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