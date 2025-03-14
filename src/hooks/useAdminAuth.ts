
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAdminAuth = (redirectTo: string = '/admin/login') => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = async () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      
      if (adminAuth === 'true') {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        
        // Only redirect if we're not already on the login page and not trying to access it
        if (location.pathname !== redirectTo && !location.pathname.includes(redirectTo)) {
          navigate(redirectTo);
        }
        
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, redirectTo, location.pathname]);

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  return { isAuthenticated, isLoading, logout };
};
