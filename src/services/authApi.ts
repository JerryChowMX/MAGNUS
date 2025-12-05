import { strapiClient } from '../api/strapiClient';
import { withMockFallback } from '../api/mockFallback';
import type { LoginCredentials, AuthResponse, User } from '../types/auth';

// Mock data for fallback (matches Strapi response format)
const MOCK_USER: User = {
    id: 'user-123',
    name: 'Usuario Demo',
    email: 'demo@magnus.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=demo'
};

const MOCK_AUTH_RESPONSE: AuthResponse = {
    user: MOCK_USER,
    token: 'mock-jwt-token-123456',
    refreshToken: 'mock-refresh-token-789012'
};

/**
 * Auth API - Now using Strapi authentication
 * 
 * Strapi endpoints:
 * - POST /auth/local - Login with email/password
 * - GET /users/me - Get current authenticated user
 * - No logout endpoint (client-side token removal)
 */
export const authApi = {
    /**
     * Login user with email and password
     * Strapi returns: { jwt: string, user: {...} }
     */
    login: async (credentials: LoginCredentials) => {
        return withMockFallback<AuthResponse>(
            async () => {
                // Strapi auth endpoint expects 'identifier' (email or username) and 'password'
                const response = await strapiClient.post<{
                    jwt: string;
                    user: {
                        id: number;
                        username: string;
                        email: string;
                        confirmed: boolean;
                        blocked: boolean;
                    };
                }>('/auth/local', {
                    identifier: credentials.email,
                    password: credentials.password
                });

                // Transform Strapi response to our AuthResponse format
                return {
                    user: {
                        id: response.user.id.toString(),
                        name: response.user.username,
                        email: response.user.email,
                        avatarUrl: `https://i.pravatar.cc/150?u=${response.user.email}` // Generate avatar
                    },
                    token: response.jwt,
                    refreshToken: response.jwt // Strapi uses same JWT for both
                };
            },
            MOCK_AUTH_RESPONSE,
            'auth/login'
        );
    },

    /**
     * Logout user
     * Strapi doesn't have a logout endpoint - we just clear the client-side token
     */
    logout: async () => {
        return withMockFallback<void>(
            async () => {
                // Clear the JWT token from strapiClient
                strapiClient.clearToken();
                // No API call needed for Strapi logout
                return undefined;
            },
            undefined,
            'auth/logout'
        );
    },

    /**
     * Get current authenticated user
     * Requires JWT token to be set in strapiClient
     */
    getCurrentUser: async () => {
        return withMockFallback<User>(
            async () => {
                // Strapi endpoint for getting current user
                const response = await strapiClient.get<{
                    id: number;
                    username: string;
                    email: string;
                    confirmed: boolean;
                    blocked: boolean;
                }>('/users/me');

                // Transform Strapi user to our User format
                return {
                    id: response.id.toString(),
                    name: response.username,
                    email: response.email,
                    avatarUrl: `https://i.pravatar.cc/150?u=${response.email}`
                };
            },
            MOCK_USER,
            'auth/me'
        );
    }
};
