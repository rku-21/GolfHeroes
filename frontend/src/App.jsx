import { Navigate, Routes,Route } from "react-router-dom";
import {LandingPage} from "./Pages/landingPage.jsx";
import {LoginPage} from "./Pages/loginPage.jsx";
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore.js";
import SignUpPage from "./Pages/signupPage.jsx";
import  { HomePage } from "./Pages/home.jsx";
import { SelectCharity } from "./Pages/selectCharity.jsx";
import { SubscriptionPage } from "./Pages/subscriptionPage.jsx";




export const App=()=>{
   const {authUser,checkAuth}=useAuthStore();

   useEffect(() => {
    checkAuth();
}, []);
   
  
   return (
    <Routes>
      
      <Route path="/" element={!authUser?<LandingPage/>: <Navigate to="/home"/>}/>
      <Route path="/charities" element={<SelectCharity/>}/>
      <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/home"/>}/>
      <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/charities"/>}/>
      <Route path="/plans" element={<SubscriptionPage/>}/>
      <Route path="/home" element={authUser?<HomePage/>: <Navigate to="/login"/>}/>
    </Routes>

   )
}