import React from 'react';
import { Stack } from '../../../components/Layout';
import { Headline, Caption } from '../../../components/Typography/Typography';
import type { ResumenCartoon } from '../types/resumen.types';
import './ResumenCartoonStrip.css';

export interface ResumenCartoonStripProps {
    cartoons: ResumenCartoon[];
}

export const ResumenCartoonStrip: React.FC<ResumenCartoonStripProps> = ({ cartoons }) => {
    return (
        <div className="resumen-cartoon-strip">
            {cartoons.map(cartoon => (
                <div key={cartoon.id} className="resumen-cartoon-item">
                    <Stack spacing="sm" align="center">
                        <img src={cartoon.imageUrl} alt={cartoon.title} />
                        <Headline level={4}>{cartoon.title}</Headline>
                        {cartoon.artist && <Caption>by {cartoon.artist}</Caption>}
                    </Stack>
                </div>
            ))}
        </div>
    );
};
