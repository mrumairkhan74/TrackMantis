import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Fetch user from cookie session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/me`, {
          withCredentials: true
        });
        setUser(res.data);
      } catch (err) {
        console.log("Not authenticated:", err.message);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async ({ user: userData }) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData)); // Optional
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      setUser(null);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
