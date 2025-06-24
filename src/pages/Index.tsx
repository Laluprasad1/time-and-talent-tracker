
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, login, logout, loading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} loading={loading} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
