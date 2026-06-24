import { Navigate, Routes,Route } from "react-router-dom";
import {LandingPage} from "./Pages/landingPage.jsx";
import {LoginPage} from "./Pages/loginPage.jsx";
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore.js";
import SignUpPage from "./Pages/signupPage.jsx";
import  { HomePage } from "./Pages/home.jsx";




export const App=()=>{
   const {authUser,checkAuth}=useAuthStore();

   useEffect(() => {
    checkAuth();
}, []);
  
   return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/dashboard"/>}/>
      <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={authUser?<HomePage/>: <Navigate to="/login"/>}/>
    </Routes>

   )
}