import React from 'react';
import { Stack } from '../../../components/Layout';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './ResumenArticleFormatsList.css';

export interface ResumenArticleFormatsListProps {
    basePath: string;
}

export const ResumenArticleFormatsList: React.FC<ResumenArticleFormatsListProps> = ({ basePath }) => {
    const navigate = useNavigate();

    return (
        <Stack spacing="md">
            <Button fullWidth variant="secondary" onClick={() => navigate(`${basePath}/original`)}>
                Leer nota original
            </Button>
            <Button fullWidth variant="secondary" onClick={() => navigate(`${basePath}/ejecutivo`)}>
                Resumen Ejecutivo
            </Button>
            <Button fullWidth variant="secondary" onClick={() => navigate(`${basePath}/audio`)}>
                Resumen de Audio
            </Button>
            <Button fullWidth variant="secondary" onClick={() => navigate(`${basePath}/guiada`)}>
                Presentación Guiada
            </Button>
        </Stack>
    );
};
