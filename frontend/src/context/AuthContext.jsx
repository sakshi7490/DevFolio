import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "../services/auth.service";

import {
  saveToken,
  getToken,
  removeToken,
} from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (userData) => {
    const response = await registerService(userData);

    saveToken(response.data.token);
    setUser(response.data.user);

    return response;
  };

  const login = async (credentials) => {
    const response = await loginService(credentials);

    saveToken(response.data.token);
    setUser(response.data.user);

    return response;
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      // Ignore backend logout errors
    }

    removeToken();
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;