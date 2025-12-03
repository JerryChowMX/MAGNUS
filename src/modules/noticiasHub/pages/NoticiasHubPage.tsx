import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Grid } from '../../../components/Layout';
import { Body } from '../../../components/Typography/Typography';
import { HeaderHubs } from '../components/HeaderHubs';
import { ArticleCard } from '../components/ArticleCard';
import { useNoticiasDate } from '../hooks/useNoticiasDate';
import { useNoticiasArticles } from '../hooks/useNoticiasArticles';
import './NoticiasHubPage.css';

export const NoticiasHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentDate, handleDateChange } = useNoticiasDate();
    const { articles, isLoading, error } = useNoticiasArticles(currentDate);

    return (
        <PageWrapper>
            <HeaderHubs
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onBack={() => navigate('/')}
            />

            <Section padding="md">
                {isLoading && <Body>Loading articles...</Body>}
                {error && <Body color="error">Error loading articles.</Body>}

                {!isLoading && !error && (
                    <Grid columns={1} gap="md">
                        {articles.map(article => (
                            <ArticleCard
                                key={article.id}
                                title={article.title}
                                imageUrl={article.imageUrl}
                                publishedAt={article.publishedAt}
                                section={article.section}
                                onClick={() => navigate(`/NoticiasHub/${currentDate}/${article.id}`)}
                            />
                        ))}
                    </Grid>
                )}
            </Section>
        </PageWrapper>
    );
};
