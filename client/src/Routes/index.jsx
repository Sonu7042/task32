import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import  App from "../App.jsx";
import Home from '../component/Home'
import Login from '../component/Login.jsx'
import  Register from '../component/Register.jsx'




const router=  createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
               <Route path="" element={<Home/>} />
               <Route path="/login" element={<Login/>} />
               <Route path="/register" element={<Register/>} />
                
        </Route>
     
    
    )
)



export default router



