
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminAuth = (redirectTo: string = '/admin/login') => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuthenticated');
      
      if (adminAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        navigate(redirectTo);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, redirectTo]);

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  return { isAuthenticated, isLoading, logout };
};
