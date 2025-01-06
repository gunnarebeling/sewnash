import { Route, Routes } from "react-router-dom"
import CustomerNavBar from "./CustomerNavBar"
import { CustomerHome } from "./CustomerHome"
import { BookByClass } from "./sewClasses/BookByClass"
import { BookingForm } from "./customerForm/BookingForm"
import { BookByDate } from "./sewClasses/BookByDate"


export const CustomerRoutes = () => {
    return (
        <>
      <CustomerNavBar />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/class/:classId" element={<BookByClass />} />
        <Route path="/booking/:sessionId" element={<BookingForm/>}/>
        <Route path="/bookbydate" element={<BookByDate/>}/>
      </Routes>
      
    </>
    )
}