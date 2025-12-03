import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Grid } from '../../../components/Layout';
import { HeaderHubs } from '../../noticiasHub/components/HeaderHubs';
import { EpaperCard } from '../components/EpaperCard';
import { useEpaperDate } from '../hooks/useEpaperDate';
import './EpaperHubPage.css';

export const EpaperHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { date: _date } = useParams<{ date: string }>();
    const { currentDate, handleDateChange } = useEpaperDate();

    // Mock editions for the day
    const editions = [
        { id: '1', number: '1', date: currentDate },
        { id: '2', number: '2', date: currentDate },
    ];

    return (
        <PageWrapper>
            <HeaderHubs
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onBack={() => navigate('/')}
            />

            <Section padding="md">
                <Grid columns={2} gap="md">
                    {editions.map(edition => (
                        <EpaperCard
                            key={edition.id}
                            date={edition.date}
                            editionNumber={edition.number}
                            onClick={() => navigate(`/EPaper/${currentDate}/${edition.number}`)}
                        />
                    ))}
                </Grid>
            </Section>
        </PageWrapper>
    );
};
