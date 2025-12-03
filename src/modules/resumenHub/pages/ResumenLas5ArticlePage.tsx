import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { Headline, Body } from '../../../components/Typography/Typography';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { ResumenArticleFormatsList } from '../components/ResumenArticleFormatsList';
import { resumenApi } from '../services/resumenApi';
import type { ResumenArticle } from '../types/resumen.types';
import './ResumenLas5ArticlePage.css';

export const ResumenLas5ArticlePage: React.FC = () => {
    const { date, slug } = useParams<{ date: string; slug: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<ResumenArticle | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            if (slug) {
                setLoading(true);
                const data = await resumenApi.getArticleById(slug);
                setArticle(data);
                setLoading(false);
            }
        };
        fetch();
    }, [slug]);

    if (loading) return <PageWrapper><Section padding="md"><Body>Loading...</Body></Section></PageWrapper>;
    if (!article) return <PageWrapper><Section padding="md"><Body>Article not found.</Body></Section></PageWrapper>;

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/ResumenHub/${date}/Las5DelDia`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="none">
                <div className="resumen-article-hero">
                    <img src={article.imageUrl} alt={article.title} className="resumen-article-image" />
                </div>
            </Section>

            <Section padding="md">
                <Stack spacing="lg">
                    <Headline level={2}>{article.title}</Headline>
                    {article.summary && <Body size="lg">{article.summary}</Body>}

                    <ResumenArticleFormatsList basePath={`/ResumenHub/${date}/Las5DelDia/${slug}`} />
                </Stack>
            </Section>
        </PageWrapper>
    );
};
