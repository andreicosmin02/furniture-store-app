import { useAuthStore } from '@/app/data/authStore';
import { jwtDecode } from 'jwt-decode';

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const { token, refreshToken, logout } = useAuthStore.getState();
  
  let newToken = token;
  
  // Check if token is about to expire (within 5 minutes)
  const isTokenExpired = () => {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp - currentTime < 300; // 5 minutes
    } catch {
      return true;
    }
  };
  
  // Refresh token if needed
  if (token && isTokenExpired()) {
    try {
      await refreshToken();
      newToken = useAuthStore.getState().token;
    } catch (error) {
      logout();
      throw new Error('Session expired');
    }
  }
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${newToken}`,
  };

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  return response;
};