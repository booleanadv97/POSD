import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: undefined,
  notifications: undefined,
  setNotifications: () => {},
  isLoading: false,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);