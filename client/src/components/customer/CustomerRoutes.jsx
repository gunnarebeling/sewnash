import { Outlet, Route, Routes } from "react-router-dom"
import CustomerNavBar from "./CustomerNavBar"
import { CustomerHome } from "./CustomerHome"

export const CustomerRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <CustomerNavBar/>
                        <Outlet/>
                    </>
                }
                >
                    <Route index element={<CustomerHome/>}/>
            </Route>
        </Routes>
    )
}