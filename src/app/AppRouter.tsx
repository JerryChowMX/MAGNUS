import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { Heading, Text } from '../components/Typography/Typography';
import { HomeHubsPage } from '../modules/home/pages/HomeHubsPage';
import { NoticiasHubPage } from '../modules/noticiasHub/pages/NoticiasHubPage';
import { NoticiasArticlePage } from '../modules/noticiasHub/pages/NoticiasArticlePage';
import { NoticiasArticleFormatPage } from '../modules/noticiasHub/pages/NoticiasArticleFormatPage';
import { ResumenHubPage } from '../modules/resumenHub/pages/ResumenHubPage';
import { ResumenLas5Page } from '../modules/resumenHub/pages/ResumenLas5Page';
import { ResumenLas5ArticlePage } from '../modules/resumenHub/pages/ResumenLas5ArticlePage';
import { ResumenLas5ArticleFormatPage } from '../modules/resumenHub/pages/ResumenLas5ArticleFormatPage';
import { ResumenOpinionPage } from '../modules/resumenHub/pages/ResumenOpinionPage';
import { ResumenOpinionArticlePage } from '../modules/resumenHub/pages/ResumenOpinionArticlePage';
import { ResumenOpinionArticleFormatPage } from '../modules/resumenHub/pages/ResumenOpinionArticleFormatPage';
import { ResumenPodcastPage } from '../modules/resumenHub/pages/ResumenPodcastPage';
import { ResumenFotosPage } from '../modules/resumenHub/pages/ResumenFotosPage';
import { ResumenCartonesPage } from '../modules/resumenHub/pages/ResumenCartonesPage';
import { ResumenJuegosRedirectPage } from '../modules/resumenHub/pages/ResumenJuegosRedirectPage';
import { EpaperHubPage } from '../modules/epaper/pages/EpaperHubPage';
import { EpaperEditionPage } from '../modules/epaper/pages/EpaperEditionPage';
import { AuthProvider } from '../context/AuthContext';
import { LoginPage } from '../modules/auth/pages/LoginPage';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { PerfilHubPage } from '../modules/perfilHub/pages/PerfilHubPage';
import { PlaygroundMenu } from '../modules/playground/PlaygroundMenu';
import { StagingMenu } from '../modules/staging/StagingMenu';
import { PlaygroundArticle } from '../modules/playground/PlaygroundArticle';
import { PlaygroundArticleStandard } from '../modules/playground/PlaygroundArticleStandard';
import { PlaygroundArticleStandardDark } from '../modules/playground/PlaygroundArticleStandardDark';
import { PlaygroundHome } from '../modules/playground/PlaygroundHome';
import { PlaygroundComponents } from '../modules/playground/PlaygroundComponents';
import { PlaygroundArticleComponents } from '../modules/playground/components/articlecomponents/PlaygroundArticleComponents';
import { PlaygroundRecommendedArticles } from '../modules/playground/components/articlecomponents/PlaygroundRecommendedArticles';
import { PlaygroundAuthorCard } from '../modules/playground/components/articlecomponents/PlaygroundAuthorCard';

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

// Helper to redirect to today's date
const RedirectToToday = () => {
    const location = useLocation();
    // Get today's date in YYYY-MM-DD format (local time)
    const today = new Date().toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD

    // Construct new path: /CurrentPath/YYYY-MM-DD
    // Ensure we don't double slash if location.pathname ends with /
    const cleanPath = location.pathname.replace(/\/$/, '');

    return <Navigate to={`${cleanPath}/${today}`} replace />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
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
                </Routes>
            </AuthProvider>
        </BrowserRouter >
    );
};
