import { apiClient } from '../../../api/apiClient';
import { withMockFallback } from '../../../api/mockFallback';
import type { ResumenArticle, ResumenPodcast, ResumenPhoto, ResumenCartoon } from '../../../types/resumen';
import { MOCK_PODCAST } from '../mocks/resumenPodcast.mock';
import { MOCK_LAS_5, MOCK_OPINION } from '../mocks/resumenArticles.mock';
import { MOCK_PHOTOS, MOCK_CARTOONS } from '../mocks/resumenMedia.mock';

export const resumenApi = {
    getLas5Articles: async (date: string) => {
        return withMockFallback<ResumenArticle[]>(
            () => apiClient.get<ResumenArticle[]>(`/resumen/las-5?date=${date}`),
            MOCK_LAS_5,
            'resumen/las-5'
        );
    },
    getOpinionArticles: async (date: string) => {
        return withMockFallback<ResumenArticle[]>(
            () => apiClient.get<ResumenArticle[]>(`/resumen/opinion?date=${date}`),
            MOCK_OPINION,
            'resumen/opinion'
        );
    },
    getPodcast: async (date: string) => {
        return withMockFallback<ResumenPodcast>(
            () => apiClient.get<ResumenPodcast>(`/resumen/podcast?date=${date}`),
            MOCK_PODCAST,
            'resumen/podcast'
        );
    },
    getPhotos: async (date: string) => {
        return withMockFallback<ResumenPhoto[]>(
            () => apiClient.get<ResumenPhoto[]>(`/resumen/photos?date=${date}`),
            MOCK_PHOTOS,
            'resumen/photos'
        );
    },
    getCartoons: async (date: string) => {
        return withMockFallback<ResumenCartoon[]>(
            () => apiClient.get<ResumenCartoon[]>(`/resumen/cartoons?date=${date}`),
            MOCK_CARTOONS,
            'resumen/cartoons'
        );
    },
    getArticleById: async (id: string) => {
        // For now, we simulate fetching by ID from our mocks if the API fails
        const mockArticle = [...MOCK_LAS_5, ...MOCK_OPINION].find(a => a.id === id);
        return withMockFallback<ResumenArticle | undefined>(
            () => apiClient.get<ResumenArticle>(`/resumen/articles/${id}`),
            mockArticle,
            `resumen/articles/${id}`
        );
    }
};
