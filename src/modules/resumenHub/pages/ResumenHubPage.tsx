import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Grid } from '../../../components/Layout';
import { HeaderHubs } from '../../noticiasHub/components/HeaderHubs';
import { ResumenOptionCard } from '../components/ResumenOptionCard';
import { useResumenDate } from '../hooks/useResumenDate';
import './ResumenHubPage.css';

export const ResumenHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentDate, handleDateChange } = useResumenDate();

    const options = [
        { title: "Las 5 noticias del día", to: `/ResumenHub/${currentDate}/Las5DelDia` },
        { title: "El podcast del día", to: `/ResumenHub/${currentDate}/ElPodcastDelDia` },
        { title: "La opinión del día", to: `/ResumenHub/${currentDate}/LaOpinionDelDia` },
        { title: "Las fotografías del día", to: `/ResumenHub/${currentDate}/LasFotosDelDia` },
        { title: "Los cartones del día", to: `/ResumenHub/${currentDate}/LosCartonesDelDia` },
        { title: "Los juegos del día", to: `/ResumenHub/${currentDate}/LosJuegosDelDia` },
    ];

    return (
        <PageWrapper>
            <HeaderHubs
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onBack={() => navigate('/')}
            />

            <Section padding="md">
                <Grid columns={1} gap="md">
                    {options.map((opt, idx) => (
                        <ResumenOptionCard key={idx} title={opt.title} to={opt.to} />
                    ))}
                </Grid>
            </Section>
        </PageWrapper>
    );
};
