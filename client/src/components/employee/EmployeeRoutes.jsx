import { Outlet, Route, Routes } from "react-router-dom"
import EmployeeNavBar from "./EmployeeNavBar"
import { BookingsList } from "./bookings/BookingsList"
import { ClassList } from "./Classes/ClassList"
import { ClassDetails } from "./Classes/ClassDetails"
import { AvailabilityCalendar } from "./availability/AvailabilityCalendar"


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
                    <Route path="classes">
                        <Route index element={<ClassList/>}/>
                        <Route path=":classId">
                            <Route index element={<ClassDetails/>}/>
                            <Route path="availability" element={<AvailabilityCalendar/>}/>
                        </Route>
                        
                    </Route>
                

            </Route>
        </Routes>
    )
}