import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Patterns from "./pages/Patterns/Patterns"
import CWEs from "./pages/CWEs/CWEs"
import CWEPatterns from "./pages/CWEs/CWEPatterns"
import ViewPatternExample from "./pages/Patterns/ViewPatternExample";
import { getToken } from "./helpers";
import { useAuthContext } from "./context/AuthContext";
const AppRoutes = () => {
  useAuthContext();
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={ getToken() ? <Home /> : <Navigate to="/signin"/>} />
      {/* Pattern routes*/}
      <Route path="/patterns" element={getToken() ? <Patterns />: <Navigate to="/signin"/>} />
      <Route path="/patterns/viewpatternexample" element={getToken() ? <ViewPatternExample />: <Navigate to="/signin"/>} />
      {/* CWE routes*/}
      <Route path="/cwes" element={getToken() ? <CWEs />: <Navigate to="/signin"/>} />
      <Route path="/viewcwepatterns" element={getToken() ? <CWEPatterns />: <Navigate to="/signin"/>} />
      {/* User routes*/}
      <Route path="/profile" element={getToken() ? <Profile />: <Navigate to="/signin"/>} />
      <Route path="/signin" element={getToken() ? <Navigate to="/profile"/> : <SignIn/>} />
      <Route path="/signup" element={getToken() ? <Navigate to="/profile"/> : <SignUp/>} />
    </Routes>
  );
};

export default AppRoutes;
