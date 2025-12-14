import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const createUser = async (formData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', formData);
      setUserData(response.data.user);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', { 
        email, 
        password 
      });
      
      setUserData(response.data.user);
      setUser(response.data.user);
      
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/auth/logout');
      setUserData(null);
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const response = await axiosInstance.patch('/users/profile', profileData);
      await fetchUserData();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      setUserData(response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      setUserData(null);
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/me');
        
        if (response.data.user) {
          setUserData(response.data.user);
          setUser(response.data.user);
        }
      } catch (error) {
        setUser(null);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const authInfo = {
    user,
    userData,
    loading,
    createUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;