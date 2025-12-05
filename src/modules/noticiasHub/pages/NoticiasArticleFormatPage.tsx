import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { Headline, Body } from '../../../components/Typography/Typography';
import { AudioPlayer } from '../../../components/AudioPlayer/AudioPlayer';
import { HeaderContent } from '../components/HeaderContent';
import { useNoticiasArticle } from '../hooks/useNoticiasArticle';
import { FALLBACK_AUDIO_URL } from '../../../constants/media';
import type { ArticleFormat } from '../types/noticias.types';
import { useShare } from '../../../hooks/useShare';
import { ShareModal } from '../../../components/ShareModal';
import { useScrollTracking } from '../../../hooks/useScrollTracking';
import { trackArticleView } from '../../../lib/analytics';

import './NoticiasArticleFormatPage.css';

export const NoticiasArticleFormatPage: React.FC = () => {
    const { date, slug, format } = useParams<{ date: string; slug: string; format: string }>();
    const navigate = useNavigate();
    const { article, isLoading, error } = useNoticiasArticle(slug || '');
    const { handleShare, isModalOpen, closeModal, shareData } = useShare();

    // Scroll Analytics
    useScrollTracking(article?.id, 'noticias', format as any);

    React.useEffect(() => {
        if (article) {
            trackArticleView(article.id, 'noticias', format as any);
        }
    }, [article, format]);

    if (isLoading) return <PageWrapper><Section padding="md"><Body>Loading...</Body></Section></PageWrapper>;
    if (error || !article) return <PageWrapper><Section padding="md"><Body>Article not found.</Body></Section></PageWrapper>;

    const renderContent = () => {
        switch (format as ArticleFormat) {
            case 'original':
                return (
                    <Stack spacing="md">
                        <Headline level={3}>Nota Original</Headline>
                        <Body>{article.content}</Body>
                    </Stack>
                );
            case 'ejecutivo':
                return (
                    <Stack spacing="md">
                        <Headline level={3}>Resumen Ejecutivo</Headline>
                        <Body>{article.summary}</Body>
                        <Body>Here are the key bullet points...</Body>
                    </Stack>
                );
            case 'audio':
                return (
                    <Stack spacing="md">
                        <Headline level={3}>Resumen de Audio</Headline>
                        <AudioPlayer
                            src={article.audioUrl || FALLBACK_AUDIO_URL}
                            analytics={{ articleId: article.id, section: 'noticias' }}
                        />
                    </Stack>
                );
            case 'guiada':
                return (
                    <Stack spacing="md">
                        <Headline level={3}>Presentación Guiada</Headline>
                        <Body>Step 1: Introduction...</Body>
                        <Body>Step 2: Details...</Body>
                    </Stack>
                );
            default:
                return <Body>Unknown format</Body>;
        }
    };

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/NoticiasHub/${date}/${slug}`)}
                onShare={() => article && handleShare({
                    title: article.title,
                    analytics: {
                        articleId: article.id,
                        section: 'noticias',
                        format: format
                    }
                })}
            />

            <Section padding="md">
                <Stack spacing="lg">
                    <Headline level={2}>{article.title}</Headline>
                    {renderContent()}
                </Stack>
            </Section>

            <ShareModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={shareData?.title || ''}
                url={shareData?.url}
                analytics={shareData?.analytics}
            />
        </PageWrapper>
    );
};
