import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/app/data/authStore";

export default function Index() {
  const { initialize, token, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
    const checkHealth = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}health`);
        const data = await response.json();
        console.log('Health check:', data);
      } catch (error) {
        console.error('Health check failed:', error);
      }
    };
    checkHealth();
  }, []);

  if (isLoading) {
    return null;
  }

  return token ? <Redirect href="/(app)/home" /> : <Redirect href="/login" />;
}