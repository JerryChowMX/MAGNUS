import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { Heading, Text } from '../components/Typography/Typography';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';


// Lazy load all page components
const HomeHubsPage = lazy(() => import('../modules/home/pages/HomeHubsPage').then(module => ({ default: module.HomeHubsPage })));
const NoticiasHubPage = lazy(() => import('../modules/noticiasHub/pages/NoticiasHubPage').then(module => ({ default: module.NoticiasHubPage })));
const NoticiasArticlePage = lazy(() => import('../modules/noticiasHub/pages/NoticiasArticlePage').then(module => ({ default: module.NoticiasArticlePage })));
const NoticiasArticleFormatPage = lazy(() => import('../modules/noticiasHub/pages/NoticiasArticleFormatPage').then(module => ({ default: module.NoticiasArticleFormatPage })));

const ResumenHubPage = lazy(() => import('../modules/resumenHub/pages/ResumenHubPage').then(module => ({ default: module.ResumenHubPage })));
const ResumenLas5Page = lazy(() => import('../modules/resumenHub/pages/ResumenLas5Page').then(module => ({ default: module.ResumenLas5Page })));
const ResumenLas5ArticlePage = lazy(() => import('../modules/resumenHub/pages/ResumenLas5ArticlePage').then(module => ({ default: module.ResumenLas5ArticlePage })));
const ResumenLas5ArticleFormatPage = lazy(() => import('../modules/resumenHub/pages/ResumenLas5ArticleFormatPage').then(module => ({ default: module.ResumenLas5ArticleFormatPage })));

const ResumenOpinionPage = lazy(() => import('../modules/resumenHub/pages/ResumenOpinionPage').then(module => ({ default: module.ResumenOpinionPage })));
const ResumenOpinionArticlePage = lazy(() => import('../modules/resumenHub/pages/ResumenOpinionArticlePage').then(module => ({ default: module.ResumenOpinionArticlePage })));
const ResumenOpinionArticleFormatPage = lazy(() => import('../modules/resumenHub/pages/ResumenOpinionArticleFormatPage').then(module => ({ default: module.ResumenOpinionArticleFormatPage })));

const ResumenPodcastPage = lazy(() => import('../modules/resumenHub/pages/ResumenPodcastPage').then(module => ({ default: module.ResumenPodcastPage })));
const ResumenFotosPage = lazy(() => import('../modules/resumenHub/pages/ResumenFotosPage').then(module => ({ default: module.ResumenFotosPage })));
const ResumenCartonesPage = lazy(() => import('../modules/resumenHub/pages/ResumenCartonesPage').then(module => ({ default: module.ResumenCartonesPage })));
const ResumenJuegosRedirectPage = lazy(() => import('../modules/resumenHub/pages/ResumenJuegosRedirectPage').then(module => ({ default: module.ResumenJuegosRedirectPage })));

const EpaperHubPage = lazy(() => import('../modules/epaper/pages/EpaperHubPage').then(module => ({ default: module.EpaperHubPage })));
const EpaperEditionPage = lazy(() => import('../modules/epaper/pages/EpaperEditionPage').then(module => ({ default: module.EpaperEditionPage })));

const LoginPage = lazy(() => import('../modules/auth/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const PerfilHubPage = lazy(() => import('../modules/perfilHub/pages/PerfilHubPage').then(module => ({ default: module.PerfilHubPage })));

// Playground & Staging
const PlaygroundMenu = lazy(() => import('../modules/playground/PlaygroundMenu').then(module => ({ default: module.PlaygroundMenu })));
const StagingMenu = lazy(() => import('../modules/staging/StagingMenu').then(module => ({ default: module.StagingMenu })));
const PlaygroundArticle = lazy(() => import('../modules/playground/PlaygroundArticle').then(module => ({ default: module.PlaygroundArticle })));
const PlaygroundArticleStandard = lazy(() => import('../modules/playground/PlaygroundArticleStandard').then(module => ({ default: module.PlaygroundArticleStandard })));
const PlaygroundArticleStandardDark = lazy(() => import('../modules/playground/PlaygroundArticleStandardDark').then(module => ({ default: module.PlaygroundArticleStandardDark })));
const PlaygroundHome = lazy(() => import('../modules/playground/PlaygroundHome').then(module => ({ default: module.PlaygroundHome })));
const PlaygroundComponents = lazy(() => import('../modules/playground/PlaygroundComponents').then(module => ({ default: module.PlaygroundComponents })));
const PlaygroundArticleComponents = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundArticleComponents').then(module => ({ default: module.PlaygroundArticleComponents })));
const PlaygroundRecommendedArticles = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundRecommendedArticles').then(module => ({ default: module.PlaygroundRecommendedArticles })));
const PlaygroundAuthorCard = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundAuthorCard').then(module => ({ default: module.PlaygroundAuthorCard })));
const PlaygroundRichText = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundRichText').then(module => ({ default: module.PlaygroundRichText })));
const PlaygroundQuote = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundQuote').then(module => ({ default: module.PlaygroundQuote })));
const PlaygroundGallery = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundGallery').then(module => ({ default: module.PlaygroundGallery })));
const PlaygroundEmbed = lazy(() => import('../modules/playground/components/articlecomponents/PlaygroundEmbed').then(module => ({ default: module.PlaygroundEmbed })));
const StrapiTestPage = lazy(() => import('../modules/noticiasHub/pages/StrapiTestPage')); // StrapiTestPage is likely default export based on usage
const StandardOneRoute = lazy(() => import('./routes/article/StandardOneRoute').then(module => ({ default: module.StandardOneRoute })));

const Articles = () => (
    <PageWrapper>
        <Heading level={2}>Latest Articles</Heading>
        <Text variant="body">Article list will go here.</Text>
    </PageWrapper>
);

const ArticleDetail = () => (
    <PageWrapper>
        <Heading level={2}>Article Headline</Heading>
        <Text variant="body">Article content...</Text>
    </PageWrapper>
);

// Fallback loader
const RouteLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
        <p>Loading...</p>
    </div>
);

import { getMonterreyDate } from '../lib/dateUtils';

// Helper to redirect to today's date
const RedirectToToday = () => {
    const location = useLocation();
    // Get today's date in YYYY-MM-DD format (Monterrey Time)
    const today = getMonterreyDate();

    // Construct new path: /CurrentPath/YYYY-MM-DD
    // Ensure we don't double slash if location.pathname ends with /
    const cleanPath = location.pathname.replace(/\/$/, '');

    return <Navigate to={`${cleanPath}/${today}`} replace />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Suspense fallback={<RouteLoader />}>
                    <Routes>
                        <Route path={routes.home} element={<HomeHubsPage />} />
                        <Route path={routes.articleList} element={<Articles />} />
                        <Route path="/articles/:slug" element={<ArticleDetail />} />
                        <Route path="/login" element={<LoginPage />} />

                        {/* Noticias Hub Routes */}
                        <Route path="/NoticiasHub" element={<RedirectToToday />} />
                        <Route path="/NoticiasHub/:date" element={<NoticiasHubPage />} />
                        <Route path="/NoticiasHub/:date/:slug" element={<NoticiasArticlePage />} />
                        <Route path="/NoticiasHub/:date/:slug/:format" element={<NoticiasArticleFormatPage />} />

                        {/* Resumen Hub Routes */}
                        <Route path="/ResumenHub" element={<RedirectToToday />} />
                        <Route path="/ResumenHub/:date" element={<ResumenHubPage />} />

                        <Route path="/ResumenHub/:date/Las5DelDia" element={<ResumenLas5Page />} />
                        <Route path="/ResumenHub/:date/Las5DelDia/:slug" element={<ResumenLas5ArticlePage />} />
                        <Route path="/ResumenHub/:date/Las5DelDia/:slug/:format" element={<ResumenLas5ArticleFormatPage />} />

                        <Route path="/ResumenHub/:date/LaOpinionDelDia" element={<ResumenOpinionPage />} />
                        <Route path="/ResumenHub/:date/LaOpinionDelDia/:slug" element={<ResumenOpinionArticlePage />} />
                        <Route path="/ResumenHub/:date/LaOpinionDelDia/:slug/:format" element={<ResumenOpinionArticleFormatPage />} />

                        <Route path="/ResumenHub/:date/ElPodcastDelDia" element={<ResumenPodcastPage />} />
                        <Route path="/ResumenHub/:date/LasFotosDelDia" element={<ResumenFotosPage />} />
                        <Route path="/ResumenHub/:date/LosCartonesDelDia" element={<ResumenCartonesPage />} />
                        <Route path="/ResumenHub/:date/LosJuegosDelDia" element={<ResumenJuegosRedirectPage />} />

                        {/* EPaper Routes */}
                        <Route path="/EPaper" element={<RedirectToToday />} />
                        <Route path="/EPaper/:date" element={<EpaperHubPage />} />
                        <Route path="/EPaper/:date/:editionNumber" element={<EpaperEditionPage />} />


                        {/* Perfil Hub Routes */}
                        <Route
                            path={routes.perfilHub}
                            element={
                                <ProtectedRoute>
                                    <PerfilHubPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Playground & Staging Routes */}
                        <Route path={routes.STAGING_ROOT} element={<StagingMenu />} />
                        <Route path={routes.playground} element={<PlaygroundMenu />} />
                        <Route path={routes.PLAYGROUND_ARTICLE} element={<PlaygroundArticle />} />
                        <Route path={routes.PLAYGROUND_ARTICLE_STANDARD} element={<PlaygroundArticleStandard />} />
                        <Route path={routes.PLAYGROUND_ARTICLE_STANDARD_2} element={<PlaygroundArticleStandardDark />} />
                        <Route path={routes.PLAYGROUND_HOME} element={<PlaygroundHome />} />
                        <Route path={routes.playgroundComponents} element={<PlaygroundComponents />} />
                        <Route path={routes.PLAYGROUND_ARTICLE_COMPONENTS} element={<PlaygroundArticleComponents />} />
                        <Route path={routes.PLAYGROUND_RECOMMENDED_ARTICLES} element={<PlaygroundRecommendedArticles />} />
                        <Route path={routes.PLAYGROUND_AUTHOR_CARD} element={<PlaygroundAuthorCard />} />
                        <Route path={routes.PLAYGROUND_RICH_TEXT} element={<PlaygroundRichText />} />
                        <Route path={routes.PLAYGROUND_QUOTE} element={<PlaygroundQuote />} />
                        <Route path={routes.PLAYGROUND_GALLERY} element={<PlaygroundGallery />} />
                        <Route path={routes.PLAYGROUND_EMBED} element={<PlaygroundEmbed />} />

                        {/* Staging Routes */}
                        <Route path="/articulo/:slug" element={<StandardOneRoute />} />
                        <Route path="/dev/staging/standard-one/:slug" element={<StandardOneRoute />} />

                        {/* Strapi Integration Test */}
                        <Route path={routes.strapiTest} element={<StrapiTestPage />} />
                    </Routes>
                </Suspense>
            </AuthProvider>
        </BrowserRouter >
    );
};
