import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/authApi';
import type { User, LoginCredentials } from '../types/auth';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            const storedToken = localStorage.getItem(TOKEN_KEY);
            if (storedToken) {
                try {
                    // In a real app, we would validate the token or fetch the user profile here
                    // For now, we'll optimistically assume the token is valid and fetch the user
                    const { data: userData } = await authApi.getCurrentUser();
                    setUser(userData);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Failed to bootstrap auth session', error);
                    localStorage.removeItem(TOKEN_KEY);
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        bootstrap();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const { data: response } = await authApi.login(credentials);
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem(TOKEN_KEY, response.token);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authApi.logout().catch(console.error); // Fire and forget
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
