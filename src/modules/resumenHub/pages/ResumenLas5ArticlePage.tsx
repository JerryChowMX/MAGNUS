import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { Display, Body } from '../../../components/Typography/Typography';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { ResumenArticleFormatsList } from '../components/ResumenArticleFormatsList';
import { ZoomableImage } from '../../../components/Media/ZoomableImage';
import { AiChatBar } from '../../../components/AiChatBar';
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
                const { data } = await resumenApi.getArticleById(slug);
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
                    <ZoomableImage
                        src={article.imageUrl}
                        alt={article.title}
                        className="resumen-article-image"
                        caption={article.title} // Using title as caption for now
                    />
                </div>
            </Section>

            <Section padding="md">
                <Stack spacing="lg" align="center">
                    <Display align="center" className="noticias-article-title">{article.title}</Display>

                    <Body size="sm" color="secondary" align="center" className="noticias-article-instruction">
                        Elige como quieres consumir esta noticia:
                    </Body>

                    <ResumenArticleFormatsList basePath={`/ResumenHub/${date}/Las5DelDia/${slug}`} />

                    {/* Spacer for AI Chat Bar */}
                    <div style={{ height: '80px' }} />
                </Stack>
            </Section>

            <AiChatBar />
        </PageWrapper>
    );
};
