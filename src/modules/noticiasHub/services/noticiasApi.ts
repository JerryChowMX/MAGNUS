import { apiClient } from '../../../api/apiClient';
import { withMockFallback } from '../../../api/mockFallback';
import type { NoticiasArticle } from '../../../types/noticias';
import { MOCK_ARTICLES } from '../mocks/noticiasArticles.mock';

export const noticiasApi = {
    getArticlesByDate: async (date: string) => {
        return withMockFallback<NoticiasArticle[]>(
            () => apiClient.get<NoticiasArticle[]>(`/noticias?date=${date}`),
            MOCK_ARTICLES,
            'noticias/list'
        );
    },

    getArticleBySlug: async (slug: string) => {
        const mockArticle = MOCK_ARTICLES.find(a => a.id === slug);
        return withMockFallback<NoticiasArticle | undefined>(
            () => apiClient.get<NoticiasArticle>(`/noticias/${slug}`),
            mockArticle,
            `noticias/${slug}`
        );
    }
};
