import React from 'react';
import { Stack } from '../../../components/Layout';
import { Headline, Body, Caption } from '../../../components/Typography/Typography';
import './EpaperCard.css';

interface EpaperCardProps {
    date: string;
    editionNumber: string;
    imageUrl?: string;
    onClick: () => void;
}

export const EpaperCard: React.FC<EpaperCardProps> = ({ date, editionNumber, imageUrl, onClick }) => {
    return (
        <div className="epaper-card" onClick={onClick}>
            <div className="epaper-card-image">
                {imageUrl ? (
                    <img src={imageUrl} alt={`Edition ${editionNumber}`} />
                ) : (
                    <div className="epaper-placeholder">
                        <Body>PDF Preview</Body>
                    </div>
                )}
            </div>
            <div className="epaper-card-content">
                <Stack spacing="xs">
                    <Headline level={3}>Edición {editionNumber}</Headline>
                    <Caption>{date}</Caption>
                </Stack>
            </div>
        </div>
    );
};
