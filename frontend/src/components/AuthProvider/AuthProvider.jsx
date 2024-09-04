import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../../constant";
import { useEffect } from "react";
import { getToken } from "../../helpers";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me?populate=*`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();
      setUserData(data);
      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  const updateNotifications = (notifications) => {
    setNotifications(notifications);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, notifications: notifications, setNotifications: updateNotifications, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;