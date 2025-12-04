import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section } from '../../../components/Layout';
import { HeaderHubs } from '../../noticiasHub/components/HeaderHubs';
import { EpaperCard } from '../components/EpaperCard';
import { useEpaperDate } from '../hooks/useEpaperDate';
import './EpaperHubPage.css';

export const EpaperHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { displayDate: currentDate, handleDateChange } = useEpaperDate();

    return (
        <PageWrapper>
            <HeaderHubs
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onBack={() => navigate('/')}
            />

            <Section padding="md">
                <div className="epaper-single-edition-container">
                    <EpaperCard
                        date={currentDate}
                        onClick={() => navigate(`/EPaper/${currentDate}/view`)}
                    />
                </div>
            </Section>
        </PageWrapper>
    );
};
