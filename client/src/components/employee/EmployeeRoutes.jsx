import { Outlet, Route, Routes } from "react-router-dom"
import EmployeeNavBar from "./EmployeeNavBar"
import { BookingsList } from "./bookings/BookingsList"

export const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element= {
                    <>
                    <EmployeeNavBar/>
                    <Outlet/>
                    
                    </>
                }
                >
                    {/* Employee Routes here */}
                    <Route index element={<BookingsList/>} />
                

            </Route>
        </Routes>
    )
}