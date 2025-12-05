import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Stack } from '../../../components/Layout';
import { Body, Display } from '../../../components/Typography/Typography';
import { HeaderContent } from '../components/HeaderContent';
import { FormatSelectionGrid } from '../components/FormatSelectionGrid';
import { ZoomableImage } from '../../../components/Media/ZoomableImage';
import { AiChatBar } from '../../../components/AiChatBar';
import { useNoticiasArticle } from '../hooks/useNoticiasArticle';
import { useShare } from '../../../hooks/useShare';
import { ShareModal } from '../../../components/ShareModal';
import { trackArticleView } from '../../../lib/analytics';
import { useScrollTracking } from '../../../hooks/useScrollTracking';
import './NoticiasArticlePage.css';

export const NoticiasArticlePage: React.FC = () => {
    const { date, slug } = useParams<{ date: string; slug: string }>();
    const navigate = useNavigate();
    const { article, isLoading, error } = useNoticiasArticle(slug || '');
    const { handleShare, isModalOpen, closeModal, shareData } = useShare();

    // Scroll Analytics
    useScrollTracking(article?.id, 'noticias');

    React.useEffect(() => {
        if (article) {
            trackArticleView(article.id, 'noticias', undefined, 'home');
        }
    }, [article]);

    if (isLoading) return <PageWrapper><Section padding="md"><Body>Loading...</Body></Section></PageWrapper>;
    if (error || !article) return <PageWrapper><Section padding="md"><Body>Article not found.</Body></Section></PageWrapper>;

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/NoticiasHub/${date}`)}
                onShare={() => article && handleShare({
                    title: article.title,
                    analytics: {
                        articleId: article.id,
                        section: 'noticias',
                        format: undefined
                    }
                })}
            />

            <Section padding="none">
                <div className="noticias-article-hero">
                    <ZoomableImage
                        src={article.imageUrl}
                        alt={article.title}
                        className="noticias-article-image"
                        caption={article.title}
                    />
                </div>
            </Section>

            <Section padding="md">
                <Stack spacing="lg" align="center">
                    <Display align="center" className="noticias-article-title">{article.title}</Display>

                    <Body size="sm" color="secondary" align="center" className="noticias-article-instruction">
                        Elige como quieres consumir esta noticia:
                    </Body>

                    <FormatSelectionGrid basePath={`/NoticiasHub/${date}/${slug}`} />

                    {/* Spacer for AI Chat Bar */}
                    <div style={{ height: '80px' }} />
                </Stack>
            </Section>

            <AiChatBar context="noticias" />

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
