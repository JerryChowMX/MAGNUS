import type { UserProfile, AppSettings } from '../../../types/perfil';

export const MOCK_PROFILE: { profile: UserProfile; settings: AppSettings } = {
    profile: {
        id: 'user-123',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
        plan: 'Premium',
        memberSince: '2023-01-15'
    },
    settings: {
        theme: 'system',
        fontSize: 'medium',

        notifications: true
    }
};
