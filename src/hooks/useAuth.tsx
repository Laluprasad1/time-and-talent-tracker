
import { useState, useEffect } from 'react';
import { User } from '@/types';

// Demo users for the system
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin' as const,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'pm@company.com',
    name: 'Project Manager',
    role: 'project_manager' as const,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'consultant@company.com',
    name: 'John Consultant',
    role: 'consultant' as const,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'finance@company.com',
    name: 'Finance Head',
    role: 'finance_head' as const,
    created_at: '2024-01-01T00:00:00Z',
  },
];

const DEMO_PASSWORDS: { [key: string]: string } = {
  'admin@company.com': 'admin123',
  'pm@company.com': 'pm123',
  'consultant@company.com': 'consultant123',
  'finance@company.com': 'finance123',
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('cms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo credentials
      const foundUser = DEMO_USERS.find(u => u.email === email);
      const validPassword = DEMO_PASSWORDS[email] === password;
      
      if (foundUser && validPassword) {
        setUser(foundUser);
        localStorage.setItem('cms_user', JSON.stringify(foundUser));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cms_user');
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
