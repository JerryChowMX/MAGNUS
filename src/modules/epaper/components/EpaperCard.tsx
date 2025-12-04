import React from 'react';
import { Stack } from '../../../components/Layout';
import { Headline, Caption } from '../../../components/Typography/Typography';
import './EpaperCard.css';

interface EpaperCardProps {
    date: string;
    imageUrl?: string;
    onClick: () => void;
}

export const EpaperCard: React.FC<EpaperCardProps> = ({ date, imageUrl, onClick }) => {
    // Format date for display (e.g., "4 dic 2024")
    const formatDate = (dateStr: string) => {
        try {
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('es-ES', options);
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="epaper-card" onClick={onClick}>
            <div className="epaper-card-image">
                {imageUrl ? (
                    <img src={imageUrl} alt={`EPaper ${date}`} />
                ) : (
                    <div className="epaper-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="epaper-card-content">
                <Stack spacing="xs">
                    <Headline level={3}>{formatDate(date)}</Headline>
                    <Caption>Edición impresa</Caption>
                </Stack>
            </div>
        </div>
    );
};
