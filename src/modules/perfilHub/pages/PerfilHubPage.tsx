import React, { useState } from 'react';
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
import './PerfilHubPage.css';

export const PerfilHubPage: React.FC = () => {
    const navigate = useNavigate();

    // Mock user state - replace with actual auth context later
    const [user] = useState({
        name: 'Usuario Demo',
        email: 'usuario@ejemplo.com',
        // avatarUrl: '...' 
    });

    // Preferences state
    const [darkMode, setDarkMode] = useState(false);
    const [autoOpenSummary, setAutoOpenSummary] = useState(true);
    const [autoSave, setAutoSave] = useState(false);
    const [fontSize, setFontSize] = useState('medium');

    const handleLogin = () => {
        console.log('Navigate to login');
    };

    const handleEditProfile = () => {
        console.log('Navigate to edit profile');
    };

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate('/')}
                rightIcon={<Icons.settings size={24} stroke={1.5} />}
                onRightClick={() => console.log('Settings clicked')}
            />

            <div className="perfil-hub-page__content">
                <Section padding="md">
                    <Stack spacing="lg">
                        {/* Profile Block */}
                        <ProfileCard
                            user={user}
                            onLogin={handleLogin}
                            onEdit={handleEditProfile}
                        />

                        {/* Membership Section */}
                        <SettingsSection title="Tu membresía">
                            <MembershipCard
                                planName="Plan Anual"
                                renewalDate="15/04/2026"
                                benefits={[
                                    "Acceso ilimitado a contenido",
                                    "Lectura sin publicidad",
                                    "E-Paper incluido",
                                    "Acceso a funciones MAGNUS AI"
                                ]}
                                onViewBenefits={() => console.log('Ver beneficios')}
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
                        <SettingsSection title="Preferencias de la App">
                            <div className="perfil-hub-page__preferences-row">
                                <span className="perfil-hub-page__preferences-label">Modo oscuro</span>
                                <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
                            </div>
                            <div className="perfil-hub-page__preferences-row">
                                <span className="perfil-hub-page__preferences-label">Tamaño de letra</span>
                                <OptionSelector
                                    options={[
                                        { label: 'A', value: 'small' },
                                        { label: 'A+', value: 'medium' },
                                        { label: 'A++', value: 'large' },
                                    ]}
                                    value={fontSize}
                                    onChange={setFontSize}
                                />
                            </div>
                            <div className="perfil-hub-page__preferences-row">
                                <span className="perfil-hub-page__preferences-label">Auto-abrir resumen ejecutivo</span>
                                <ToggleSwitch checked={autoOpenSummary} onChange={setAutoOpenSummary} />
                            </div>
                            <div className="perfil-hub-page__preferences-row">
                                <span className="perfil-hub-page__preferences-label">Guardar artículos automáticamente</span>
                                <ToggleSwitch checked={autoSave} onChange={setAutoSave} />
                            </div>
                        </SettingsSection>
                    </Stack>
                </Section>
            </div>

            <AiChatBar />
        </PageWrapper>
    );
};
