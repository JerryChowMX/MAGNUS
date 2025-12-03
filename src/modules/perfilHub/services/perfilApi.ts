import { apiClient } from '../../../api/apiClient';
import { withMockFallback } from '../../../api/mockFallback';
import type { UserProfile, AppSettings } from '../../../types/perfil';
import { MOCK_PROFILE } from '../mocks/profile.mock';

export const perfilApi = {
    getUserProfile: async () => {
        return withMockFallback<UserProfile>(
            () => apiClient.get<UserProfile>('/perfil/me'),
            MOCK_PROFILE.profile,
            'perfil/me'
        );
    },

    getAppSettings: async () => {
        return withMockFallback<AppSettings>(
            () => apiClient.get<AppSettings>('/perfil/settings'),
            MOCK_PROFILE.settings,
            'perfil/settings'
        );
    },

    updateAppSettings: async (settings: Partial<AppSettings>) => {
        return withMockFallback<AppSettings>(
            () => apiClient.put<AppSettings>('/perfil/settings', settings),
            { ...MOCK_PROFILE.settings, ...settings },
            'perfil/settings/update'
        );
    }
};
