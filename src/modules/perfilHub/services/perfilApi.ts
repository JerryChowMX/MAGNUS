import { strapiClient } from '../../../api/strapiClient';
import { withMockFallback } from '../../../api/mockFallback';
import type { UserProfile, AppSettings } from '../../../types/perfil';
import { MOCK_PROFILE, MOCK_SETTINGS } from '../mocks/profile.mock';

export const perfilApi = {
    getUserProfile: async () => {
        return withMockFallback<UserProfile>(
            async () => {
                const response = await strapiClient.get('/users/me?populate=*');
                // TODO: Add normalization function to transform Strapi user to UserProfile
                return response as unknown as UserProfile;
            },
            MOCK_PROFILE,
            'perfil/profile'
        );
    },

    getAppSettings: async () => {
        return withMockFallback<AppSettings>(
            async () => {
                // TODO: Define proper Strapi collection for app settings
                const response = await strapiClient.get('/app-settings');
                return response as unknown as AppSettings;
            },
            MOCK_SETTINGS,
            'perfil/settings'
        );
    },

    updateAppSettings: async (settings: Partial<AppSettings>) => {
        return withMockFallback<AppSettings>(
            async () => {
                // TODO: Implement proper update endpoint
                const response = await strapiClient.put('/app-settings', settings);
                return response as unknown as AppSettings;
            },
            { ...MOCK_SETTINGS, ...settings },
            'perfil/update-settings'
        );
    }
};
