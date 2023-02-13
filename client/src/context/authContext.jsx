import { createContext, useEffect, useState } from 'react';
import { login, logout } from '@/api/user.js';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user') || null)
  );

  const userLogin = async (params) => {
    const res = await login(params);
    setCurrentUser(res);
  };
  const userLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ userLogin, userLogout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
