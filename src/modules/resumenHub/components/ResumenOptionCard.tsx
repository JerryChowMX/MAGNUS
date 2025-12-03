import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '../../../components/Layout';
import { Headline, Body } from '../../../components/Typography/Typography';
import './ResumenOptionCard.css';

export interface ResumenOptionCardProps {
    title: string;
    description?: string;
    to: string;
}

export const ResumenOptionCard: React.FC<ResumenOptionCardProps> = ({ title, description, to }) => {
    const navigate = useNavigate();

    return (
        <div className="resumen-option-card" onClick={() => navigate(to)}>
            <Stack spacing="xs">
                <Headline level={3}>{title}</Headline>
                {description && <Body size="sm" color="secondary">{description}</Body>}
            </Stack>
            <div className="resumen-option-card__icon">&gt;</div>
        </div>
    );
};
