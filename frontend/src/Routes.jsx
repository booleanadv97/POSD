import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
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
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/admin"
        element={user?.role.name === 'Admin' ? (
            <Home /> 
          ) : (
            <Navigate to="/not-authorized" />
          )
        }
      /> 

      {/* Not Authorized Page */}
      <Route path="/not-authorized" element={<NotAuthorized />} />
    </Routes>
  );
};

export default AppRoutes;
