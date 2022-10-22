import React from 'react'
import Register from "../pages/Register"
import Login from "../pages/Login"
import Home from "../pages/Home"
import { useContext } from "react"
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
  } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {AnimatePresence} from "framer-motion"
function AnimatedRoutes() {
    const location = useLocation();
    const {currentUser} =useContext(AuthContext)
    const ProtectedRoute = ({children}) =>{
        if(!currentUser){
            return <Navigate to = "/login"/>
        }
        return children
    }
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/">
                <Route index element={
                    <ProtectedRoute>
                    <Home/>
                    </ProtectedRoute>
                }/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes