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
import ViewCWEsByPattern from "./pages/Patterns/ViewCWEsByPattern";
import GDPRArticles from "./pages/GDPR Articles/GDPRArticles";
import GDPRArticlePatterns from "./pages/GDPR Articles/ViewGDPRArticlePatterns";
import GDPRArticleCWEs from "./pages/GDPR Articles/ViewGDPRArticleCWEs";
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
      <Route path="/patterns/viewcwesbypattern" element={getToken() ? <ViewCWEsByPattern />: <Navigate to="/signin"/>} />
      {/* CWE routes*/}
      <Route path="/cwes" element={getToken() ? <CWEs />: <Navigate to="/signin"/>} />
      <Route path="/viewcwepatterns" element={getToken() ? <CWEPatterns />: <Navigate to="/signin"/>} />
      {/* GDPR Articles routes*/}
      <Route path="/gdprarticles" element={getToken() ? <GDPRArticles />: <Navigate to="/signin"/>} />
      <Route path="/gdprarticles/viewgdprarticlepatterns" element={getToken() ? <GDPRArticlePatterns />: <Navigate to="/signin"/>} />
      <Route path="/gdprarticles/viewgdprarticlecwes" element={getToken() ? <GDPRArticleCWEs />: <Navigate to="/signin"/>} />
      {/* User routes*/}
      <Route path="/profile" element={getToken() ? <Profile />: <Navigate to="/signin"/>} />
      <Route path="/signin" element={getToken() ? <Navigate to="/profile"/> : <SignIn/>} />
      <Route path="/signup" element={getToken() ? <Navigate to="/profile"/> : <SignUp/>} />
    </Routes>
  );
};

export default AppRoutes;
