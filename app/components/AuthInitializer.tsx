import { useEffect } from 'react';
import { useAuthStore } from '@/app/data/authStore';
import { Redirect, router } from 'expo-router';

export default function AuthInitializer() {
  const { initialize, isLoading, token } = useAuthStore();
  
  useEffect(() => {
    initialize();
  }, []);
  
  if (isLoading) {
    return null; // Or show a loading indicator
  }
  
  // Redirect based on auth state
  if (token) {
    return <Redirect href="/(app)/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}