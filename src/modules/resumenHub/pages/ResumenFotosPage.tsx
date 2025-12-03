import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section } from '../../../components/Layout';
import { Body } from '../../../components/Typography/Typography';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { ResumenPhotoGallery } from '../components/ResumenPhotoGallery';
import { useResumenDate } from '../hooks/useResumenDate';
import { useResumenPhotos } from '../hooks/useResumenPhotos';

export const ResumenFotosPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentDate } = useResumenDate();
    const { photos, isLoading, error } = useResumenPhotos(currentDate);

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/ResumenHub/${currentDate}`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="md">
                {isLoading && <Body>Loading photos...</Body>}
                {error && <Body color="error">Error loading photos.</Body>}

                {!isLoading && !error && (
                    <ResumenPhotoGallery photos={photos} />
                )}
            </Section>
        </PageWrapper>
    );
};
