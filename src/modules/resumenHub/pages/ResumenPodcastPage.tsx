import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section } from '../../../components/Layout';
import { Body } from '../../../components/Typography/Typography';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { ResumenPodcastPlayer } from '../components/ResumenPodcastPlayer';
import { useResumenDate } from '../hooks/useResumenDate';
import { useResumenPodcast } from '../hooks/useResumenPodcast';

export const ResumenPodcastPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentDate } = useResumenDate();
    const { podcast, isLoading, error } = useResumenPodcast(currentDate);

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/ResumenHub/${currentDate}`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="md">
                {isLoading && <Body>Loading podcast...</Body>}
                {error && <Body color="error">Error loading podcast.</Body>}

                {!isLoading && !error && podcast && (
                    <ResumenPodcastPlayer podcast={podcast} />
                )}
            </Section>
        </PageWrapper>
    );
};
