import React, { useState, useEffect } from 'react';
import { Heading, Text } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button/Button';
import { Icons } from '../../../components/Icons';
import './ProfileCard.css';

export interface UserProfile {
    name: string;
    email: string;
    avatarUrl?: string;
    description?: string;
}

export interface ProfileCardProps {

    user?: UserProfile;
    onLogin?: () => void;
    onEdit?: () => void;
    onUpdateDescription?: (description: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onLogin, onEdit, onUpdateDescription }) => {
    const [description, setDescription] = useState(user?.description || '');
    const MAX_CHARS = 160;

    useEffect(() => {
        if (user?.description) {
            setDescription(user.description);
        }
    }, [user?.description]);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        if (val.length <= MAX_CHARS) {
            setDescription(val);
            // The actual update to parent component will happen on save
        }
    };

    const [isEditingDescription, setIsEditingDescription] = useState(!user?.description);

    const handleSaveDescription = () => {
        setIsEditingDescription(false);
        if (onUpdateDescription) {
            onUpdateDescription(description);
        }
    };

    if (!user) {
        return (
            <div className="profile-card">
                <div className="profile-card__image-container">
                    <Icons.user size={64} stroke={1.5} />
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
            <div className="profile-card__image-container">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="profile-card__image" />
                ) : (
                    <Icons.user size={80} stroke={1.5} />
                )}
                {onEdit && (
                    <button className="profile-card__edit-button" onClick={onEdit} aria-label="Editar foto">
                        <Icons.edit size={18} stroke={1.5} />
                    </button>
                )}
            </div>

            <div className="profile-card__info">
                <Heading level={2}>{user.name}</Heading>
                <Text variant="body" color="secondary">{user.email}</Text>
            </div>

            <div className="profile-card__description-container">
                <div className="profile-card__description-header">
                    <label className="profile-card__description-label">Cuéntanos quién eres:</label>
                    {!isEditingDescription && (
                        <button
                            className="profile-card__edit-desc-btn"
                            onClick={() => setIsEditingDescription(true)}
                        >
                            <Icons.edit size={14} stroke={1.5} /> Editar
                        </button>
                    )}
                </div>

                {isEditingDescription ? (
                    <>
                        <textarea
                            className="profile-card__description-input"
                            placeholder="Agrega una descripción..."
                            value={description}
                            onChange={handleDescriptionChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSaveDescription();
                                }
                            }}
                        />
                        <div className="profile-card__footer">
                            <span className="profile-card__char-count">
                                {description.length}/{MAX_CHARS}
                            </span>
                            <button
                                className="profile-card__save-btn"
                                onClick={handleSaveDescription}
                            >
                                Guardar
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="profile-card__description-text">
                        {description || "Sin descripción"}
                    </div>
                )}
            </div>
        </div>
    );
};
