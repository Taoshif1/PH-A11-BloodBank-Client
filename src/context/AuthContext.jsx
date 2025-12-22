import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with backend only (Firebase is handled in component)
  const createUser = async (formData) => {
    try {
      const response = await axiosInstance.post('/auth/register', formData);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login with backend only (Firebase is handled in component)
  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      const response = await axiosInstance.patch('/users/profile', profileData);
      // Fetch fresh user data after update
      await checkAuth();
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      setUser(response.data.user || response.data);
      return response.data;
    } catch (error) {
      console.error('Fetch profile error:', error);
      throw error;
    }
  };

  // Check authentication status
  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      
      if (response.data.user) {
        setUser(response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.warn('Not authenticated:', error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check auth on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    fetchUserProfile,
    checkAuth,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;