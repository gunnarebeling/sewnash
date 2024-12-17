import { Route, Routes } from "react-router-dom"
import CustomerNavBar from "./CustomerNavBar"
import { CustomerHome } from "./CustomerHome"
import { BookByClass } from "./sewClasses/BookByClass"

export const CustomerRoutes = () => {
    return (
        <>
      <CustomerNavBar />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/bookings/class/:classId" element={<BookByClass />} />
      </Routes>
      
    </>
    )
}