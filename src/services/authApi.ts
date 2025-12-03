import { apiClient } from '../api/apiClient';
import { withMockFallback } from '../api/mockFallback';
import type { LoginCredentials, AuthResponse, User } from '../types/auth';

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

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        return withMockFallback<AuthResponse>(
            () => apiClient.post<AuthResponse>('/auth/login', credentials),
            MOCK_AUTH_RESPONSE,
            'auth/login'
        );
    },

    logout: async () => {
        return withMockFallback<void>(
            () => apiClient.post<void>('/auth/logout', {}),
            undefined,
            'auth/logout'
        );
    },

    getCurrentUser: async () => {
        return withMockFallback<User>(
            () => apiClient.get<User>('/auth/me'),
            MOCK_USER,
            'auth/me'
        );
    }
};
