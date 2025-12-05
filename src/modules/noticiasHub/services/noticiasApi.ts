import { strapiClient } from '../../../api/strapiClient';
import { withMockFallback } from '../../../api/mockFallback';
import type { NoticiasArticle } from '../../../types/noticias';
import { MOCK_ARTICLES } from '../mocks/noticiasArticles.mock';

export const noticiasApi = {
    getArticlesByDate: async (date: string) => {
        return withMockFallback<NoticiasArticle[]>(
            async () => {
                const response = await strapiClient.get(`/noticias-articles?filters[date][$eq]=${date}&populate=*`);
                // TODO: Add normalization function if needed
                return response as unknown as NoticiasArticle[];
            },
            MOCK_ARTICLES,
            'noticias/list'
        );
    },

    getArticleBySlug: async (slug: string) => {
        const mockArticle = MOCK_ARTICLES.find(a => a.id === slug);
        return withMockFallback<NoticiasArticle | undefined>(
            async () => {
                const response = await strapiClient.get(`/noticias-articles?filters[slug][$eq]=${slug}&populate=*`);
                // TODO: Add normalization function if needed
                const articles = response as unknown as NoticiasArticle[];
                return articles[0];
            },
            mockArticle,
            `noticias/${slug}`
        );
    }
};
