import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section } from '../../../components/Layout';
import { Body } from '../../../components/Typography/Typography';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { ResumenCartoonStrip } from '../components/ResumenCartoonStrip';
import { useResumenDate } from '../hooks/useResumenDate';
import { useResumenCartones } from '../hooks/useResumenCartones';

export const ResumenCartonesPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentDate } = useResumenDate();
    const { cartoons, isLoading, error } = useResumenCartones(currentDate);

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/ResumenHub/${currentDate}`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="md">
                {isLoading && <Body>Loading cartoons...</Body>}
                {error && <Body color="error">Error loading cartoons.</Body>}

                {!isLoading && !error && (
                    <ResumenCartoonStrip cartoons={cartoons} />
                )}
            </Section>
        </PageWrapper>
    );
};
