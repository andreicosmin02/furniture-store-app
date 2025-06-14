import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

type AuthState = {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkTokenValidity: () => boolean;
    initialize: () => Promise<void>;
    refreshToken: () => Promise<void>;
  };
  

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isLoading: true, // Start with loading true
            error: null,
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Login failed');
                    }

                    set({
                        token: data.token,
                        user: data.user,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.message,
                        isLoading: false,
                    });
                    throw error;
                }
            },
            
            logout: () => {
                set({ token: null, user: null, isLoading: false });
            },
            
            checkTokenValidity: () => {
                const token = get().token;
                if (!token) return false;
                
                try {
                const decoded: any = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                return decoded.exp > currentTime;
                } catch (error) {
                return false;
                }
            },
            
            initialize: async () => {
                set({ isLoading: true });
                const isValid = get().checkTokenValidity();
                
                if (!isValid) {
                set({ token: null, user: null, isLoading: false });
                return;
                }                
                
                // Token is valid, no need to do anything
                set({ isLoading: false });
            },

            refreshToken: async () => {
            set({ isLoading: true });
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}auth/refresh`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${get().token}`,
                },
                });

                const data = await response.json();

                if (!response.ok) {
                throw new Error(data.error || 'Token refresh failed');
                }

                set({
                token: data.token,
                isLoading: false,
                });
            } catch (error: any) {
                set({
                error: error.message,
                isLoading: false,
                });
                // Logout if refresh fails
                get().logout();
            }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ token: state.token, user: state.user })
        }
    )
)