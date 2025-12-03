import React from 'react';
import { Heading, Text } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button/Button';
import { Icons } from '../../../components/Icons';
import './ProfileCard.css';

export interface UserProfile {
    name: string;
    email: string;
    avatarUrl?: string;
}

export interface ProfileCardProps {
    user?: UserProfile;
    onLogin?: () => void;
    onEdit?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onLogin, onEdit }) => {
    if (!user) {
        return (
            <div className="profile-card">
                <div className="profile-card__avatar">
                    <Icons.user size={40} stroke={1.5} />
                </div>
                <Heading level={3}>Bienvenido a MAGNUS</Heading>
                <Text variant="body" color="secondary">Inicia sesión para personalizar tu experiencia.</Text>
                <div className="profile-card__actions">
                    <Button onClick={onLogin}>Iniciar Sesión</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-card">
            <div className="profile-card__avatar">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} />
                ) : (
                    <Icons.user size={40} stroke={1.5} />
                )}
            </div>
            <Heading level={2}>{user.name}</Heading>
            <Text variant="body" color="secondary">{user.email}</Text>
            {onEdit && (
                <div className="profile-card__actions">
                    <a href="#" onClick={(e) => { e.preventDefault(); onEdit(); }} className="profile-card__link">
                        Editar perfil
                    </a>
                </div>
            )}
        </div>
    );
};
