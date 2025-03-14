
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAdminAuth = (redirectTo: string = '/admin/login') => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      
      // Don't redirect if we're already on the login page
      if (adminAuth === 'true') {
        setIsAuthenticated(true);
      } else if (location.pathname !== redirectTo) {
        // Only redirect if we're not already on the login page
        navigate(redirectTo);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, redirectTo, location.pathname]);

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  return { isAuthenticated, isLoading, logout };
};
