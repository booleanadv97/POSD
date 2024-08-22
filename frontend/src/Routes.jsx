import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Patterns from "./pages/Patterns/Patterns"
import ViewPatternExample from "./pages/ViewPatternExample/ViewPatternExample";
import { useAuthContext } from "./context/AuthContext";
import NotAuthorized from "./pages/Unauthorized/Unauthorized";  
import { Spin } from "antd";
const AppRoutes = () => {
  const {user, isLoading} = useAuthContext();
  if (isLoading) {
    return <Spin size="large" />;
  }
  if (!user){
    return (<Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>);
  }
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/patterns" element={<Patterns />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/viewpatternexample" element={<ViewPatternExample />} />
      <Route
        path="/admin"
        element={user?.role.name === 'Admin' ? (
            <Home /> 
          ) : (
            <Navigate to="/not-authorized" />
          )
        }
      /> 
      <Route path="/not-authorized" element={<NotAuthorized />} />
    </Routes>
  );
};

export default AppRoutes;
