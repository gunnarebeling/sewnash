/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";

import { createContext, useEffect, useState } from "react";

import { Spinner } from "reactstrap";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Login } from "./components/auth/Login";
import {Register} from "./components/auth/Register"
import { tryGetLoggedInUser } from "./managers/authManager";
import { EmployeeRoutes } from "./components/employee/EmployeeRoutes";
import { CustomerRoutes } from "./components/customer/CustomerRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'
import { BookingComplete } from "./components/customer/customerForm/BookingComplete";
export const UserContext = createContext()
export default function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering


  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <Routes>
        <Route path="/*" element={<CustomerRoutes/>}/> 
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
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>

              <Register setLoggedInUser={setLoggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route path="complete" element={<BookingComplete/>}/>

      </Routes>
    </UserContext.Provider>
  );
}