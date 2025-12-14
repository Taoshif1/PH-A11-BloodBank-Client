import { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Register user (Firebase + Backend)
  const createUser = async (email, password, additionalData) => {
    setLoading(true);
    try {
      // Create Firebase user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Register in backend
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email,
          password,
          confirmPassword: password,
          ...additionalData
        },
        { withCredentials: true }
      );

      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login user (Backend only - we're not using Firebase for auth)
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // Sign in to Firebase to maintain compatibility
      await signInWithEmailAndPassword(auth, email, password);
      
      setUserData(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = async () => {
    setLoading(true);
    try {
      // Logout from backend
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      
      // Sign out from Firebase
      await signOut(auth);
      
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photo) => {
    try {
      // Update Firebase profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo
        });
      }

      // Refresh user data from backend
      if (user) {
        await fetchUserData();
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        { withCredentials: true }
      );
      setUserData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  };

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated via backend
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          { withCredentials: true }
        );
        
        if (response.data.user) {
          setUserData(response.data.user);
          
          // Try to sync with Firebase
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });

          return () => unsubscribe();
        }
      } catch (error) {
        // Not authenticated
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