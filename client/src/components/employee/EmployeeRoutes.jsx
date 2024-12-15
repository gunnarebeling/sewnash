import { Outlet, Route, Routes } from "react-router-dom"
import EmployeeNavBar from "./EmployeeNavBar"

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route
                path="/employee"
                element= {
                    <>
                    <EmployeeNavBar/>
                    <Outlet/>
                    
                    </>
                }
                >
                    {/* Employee Routes here */}
                

            </Route>
        </Routes>
    )
}