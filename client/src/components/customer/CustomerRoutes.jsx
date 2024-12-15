import { Outlet, Route, Routes } from "react-router-dom"
import CustomerNavBar from "./CustomerNavBar"

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
            </Route>
        </Routes>
    )
}