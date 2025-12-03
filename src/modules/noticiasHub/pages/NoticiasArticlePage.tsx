import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { Headline, Body } from '../../../components/Typography/Typography';
import { HeaderContent } from '../components/HeaderContent';
import { ArticleFormatsList } from '../components/ArticleFormatsList';
import { useNoticiasArticle } from '../hooks/useNoticiasArticle';
import './NoticiasArticlePage.css';

export const NoticiasArticlePage: React.FC = () => {
    const { date, slug } = useParams<{ date: string; slug: string }>();
    const navigate = useNavigate();
    const { article, isLoading, error } = useNoticiasArticle(slug || '');

    if (isLoading) return <PageWrapper><Section padding="md"><Body>Loading...</Body></Section></PageWrapper>;
    if (error || !article) return <PageWrapper><Section padding="md"><Body>Article not found.</Body></Section></PageWrapper>;

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/NoticiasHub/${date}`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="none">
                <div className="noticias-article-hero">
                    <img src={article.imageUrl} alt={article.title} className="noticias-article-image" />
                </div>
            </Section>

            <Section padding="md">
                <Stack spacing="lg">
                    <Headline level={2}>{article.title}</Headline>
                    {article.summary && <Body size="lg">{article.summary}</Body>}

                    <ArticleFormatsList basePath={`/NoticiasHub/${date}/${slug}`} />
                </Stack>
            </Section>
        </PageWrapper>
    );
};
