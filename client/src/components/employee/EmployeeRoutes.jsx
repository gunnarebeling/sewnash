import { Outlet, Route, Routes } from "react-router-dom"
import EmployeeNavBar from "./EmployeeNavBar"
import { BookingsList } from "./bookings/BookingsList"
import { ClassList } from "./Classes/ClassList"


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
                    <Route path="classes" element={<ClassList/>} />
                

            </Route>
        </Routes>
    )
}