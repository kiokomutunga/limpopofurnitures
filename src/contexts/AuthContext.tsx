
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (email: string, code: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('AuthProvider useEffect - token:', token ? 'exists' : 'null');
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    if (!token) {
      console.log('No token available for profile fetch');
      return;
    }
    
    console.log('Fetching user profile...');
    try {
      const response = await api.getUserProfile();
      console.log('Profile fetch response:', response);
      
      if (response.success) {
        setUser(response.user);
        console.log('User profile set successfully:', response.user);
      } else {
        console.error('Failed to fetch user profile:', response.message);
        if (response.message === 'Authentication expired' || response.message === 'Profile endpoint not found') {
          logout();
        }
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const response = await api.login({ email, password });
      console.log('Login response:', response);
      
      if (response.success && response.token) {
        console.log('Login successful, setting token');
        setToken(response.token);
        localStorage.setItem('authToken', response.token);
        await fetchUserProfile();
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; phone: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await api.register(userData);
      return { success: response.success, message: response.message };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      const response = await api.verifyOtp({ email, code });
      return { success: response.success, message: response.message };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, message: 'OTP verification failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      verifyOtp,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
