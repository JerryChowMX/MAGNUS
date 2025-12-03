import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { Headline, Body } from '../../../components/Typography/Typography';
import { AudioPlayer } from '../../../components/AudioPlayer/AudioPlayer';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { resumenApi } from '../services/resumenApi';
import type { ResumenArticle } from '../types/resumen.types';
import type { ArticleFormat } from '../../noticiasHub/types/noticias.types'; // Reuse type

export const ResumenLas5ArticleFormatPage: React.FC = () => {
    const { date, slug, format } = useParams<{ date: string; slug: string; format: string }>();
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

    const renderContent = () => {
        switch (format as ArticleFormat) {
            case 'original':
                return <Body>{article.content || 'Contenido original no disponible.'}</Body>;
            case 'ejecutivo':
                return <Body>{article.summary || 'Resumen no disponible.'}</Body>;
            case 'audio':
                return <AudioPlayer src={article.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'} />;
            case 'guiada':
                return <Body>[Presentación Guiada Placeholder]</Body>;
            default:
                return <Body>Unknown format</Body>;
        }
    };

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/ResumenHub/${date}/Las5DelDia/${slug}`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="md">
                <Stack spacing="lg">
                    <Headline level={2}>{article.title}</Headline>
                    <Headline level={4}>Format: {format}</Headline>
                    {renderContent()}
                </Stack>
            </Section>
        </PageWrapper>
    );
};
