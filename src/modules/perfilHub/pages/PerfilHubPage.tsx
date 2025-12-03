import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { AiChatBar } from '../../../components/AiChatBar';
import { Icons } from '../../../components/Icons';
import { ProfileCard } from '../components/ProfileCard';
import { MembershipCard } from '../components/MembershipCard';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsRow } from '../components/SettingsRow';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { OptionSelector } from '../components/OptionSelector';
import { useProfile } from '../hooks/useProfile';
import { Body } from '../../../components/Typography/Typography';
import './PerfilHubPage.css';

export const PerfilHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { profile, settings, updateSettings, isLoading, error, isFallback } = useProfile();

    const handleLogin = () => {
        console.log('Navigate to login');
    };

    const handleEditProfile = () => {
        console.log('Navigate to edit profile');
    };

    if (isLoading) {
        return (
            <PageWrapper>
                <HeaderContent onBack={() => navigate('/')} />
                <Section padding="md">
                    <Body>Cargando perfil...</Body>
                </Section>
            </PageWrapper>
        );
    }

    if (error) {
        return (
            <PageWrapper>
                <HeaderContent onBack={() => navigate('/')} />
                <Section padding="md">
                    <Body color="error">Error al cargar el perfil. Por favor intente más tarde.</Body>
                </Section>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate('/')}
                rightIcon={<Icons.settings size={24} stroke={1.5} />}
                onRightClick={() => console.log('Settings clicked')}
            />

            <div className="perfil-hub-page__content">
                {isFallback && (
                    <div style={{
                        backgroundColor: '#FFF4E5',
                        color: '#663C00',
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        Modo Simulación (Backend no conectado)
                    </div>
                )}

                <Section padding="md">
                    <Stack spacing="lg">
                        {/* Profile Block */}
                        {profile && (
                            <ProfileCard
                                user={{
                                    name: profile.name,
                                    email: profile.email,
                                    avatarUrl: profile.avatarUrl
                                }}
                                onLogin={handleLogin}
                                onEdit={handleEditProfile}
                            />
                        )}

                        {/* Membership Section */}
                        <SettingsSection title="Tu membresía">
                            <MembershipCard
                                planName={profile?.plan || "Gratuito"}
                                renewalDate="15/04/2026" // This could also come from API eventually
                                benefits={[
                                    "Acceso ilimitado a contenido",
                                    "Lectura sin publicidad",
                                    "E-Paper incluido",
                                    "Acceso a funciones MAGNUS AI"
                                ]}
                                onViewBenefits={() => window.open('https://Membresiavanguardia.com', '_blank')}
                                onManage={() => console.log('Administrar')}
                            />
                        </SettingsSection>

                        {/* Main Settings Grid */}
                        <SettingsSection>
                            <SettingsRow
                                icon={<Icons.bell size={24} stroke={1.5} />}
                                label="Notificaciones"
                                onClick={() => console.log('Notificaciones')}
                            />
                            <SettingsRow
                                icon={<Icons.privacy size={24} stroke={1.5} />}
                                label="Privacidad y seguridad"
                                onClick={() => console.log('Privacidad')}
                            />
                            <SettingsRow
                                icon={<Icons.info size={24} stroke={1.5} />}
                                label="Acerca de Magnus"
                                onClick={() => console.log('Acerca de')}
                            />
                            <SettingsRow
                                icon={<Icons.help size={24} stroke={1.5} />}
                                label="Ayuda y soporte"
                                onClick={() => console.log('Ayuda')}
                            />
                        </SettingsSection>

                        {/* App Preferences */}
                        {settings && (
                            <SettingsSection title="Preferencias de la App">
                                <div className="perfil-hub-page__preferences-row">
                                    <span className="perfil-hub-page__preferences-label">Modo oscuro</span>
                                    <ToggleSwitch
                                        checked={settings.theme === 'dark'}
                                        onChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
                                    />
                                </div>
                                <div className="perfil-hub-page__preferences-row">
                                    <span className="perfil-hub-page__preferences-label">Tamaño de letra</span>
                                    <OptionSelector
                                        options={[
                                            { label: 'A', value: 'small' },
                                            { label: 'A+', value: 'medium' },
                                            { label: 'A++', value: 'large' },
                                        ]}
                                        value={settings.fontSize}
                                        onChange={(val) => updateSettings({ fontSize: val as any })}
                                    />
                                </div>
                                <div className="perfil-hub-page__preferences-row">
                                    <span className="perfil-hub-page__preferences-label">Auto-abrir resumen ejecutivo</span>
                                    <ToggleSwitch
                                        checked={settings.autoOpenSummary}
                                        onChange={(checked) => updateSettings({ autoOpenSummary: checked })}
                                    />
                                </div>
                                <div className="perfil-hub-page__preferences-row">
                                    <span className="perfil-hub-page__preferences-label">Guardar artículos automáticamente</span>
                                    <ToggleSwitch
                                        checked={settings.autoSave}
                                        onChange={(checked) => updateSettings({ autoSave: checked })}
                                    />
                                </div>
                            </SettingsSection>
                        )}
                    </Stack>
                </Section>
            </div>

            <AiChatBar />
        </PageWrapper>
    );
};
