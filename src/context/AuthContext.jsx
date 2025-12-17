import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

// 1. Create Context
const AuthContext = createContext();

// 2. Context Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState(USERS); // Initialize with mock data

  useEffect(() => {
    // Simulate checking local storage or validation
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, role) => {
    console.log(`Attempting login for ${email} as ${role}`);
    
    // Check against ALL registered users (mock + new)
    // For simple mock login, we just match the ROLE. 
    // real app would match email && password.
    // To support the new registration flow, we try to find a user with this email first.
    let foundUser = registeredUsers.find(u => u.email === email && u.role === role);
    
    // Fallback for "Easy Login" (Empty email): Pick first mock user of that role
    if (!foundUser && email === '') {
        foundUser = registeredUsers.find(u => u.role === role);
    } 
    // Fallback for "Any Email" (Mock behavior): Pick first mock user if specific email not found
    else if (!foundUser) {
        foundUser = registeredUsers.find(u => u.role === role);
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (userData) => {
      const newUser = {
          id: Date.now(),
          ...userData
      };
      // Update local state
      setRegisteredUsers(prev => [...prev, newUser]);
      // Auto login
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
