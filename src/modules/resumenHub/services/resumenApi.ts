import { strapiClient } from '../../../api/strapiClient';
import { withMockFallback } from '../../../api/mockFallback';
import type { ResumenArticle, ResumenPodcast, ResumenPhoto, ResumenCartoon } from '../../../types/resumen';
import { MOCK_PODCAST } from '../mocks/resumenPodcast.mock';
import { MOCK_LAS_5, MOCK_OPINION } from '../mocks/resumenArticles.mock';
import { MOCK_PHOTOS, MOCK_CARTOONS } from '../mocks/resumenMedia.mock';
import { getStrapiMedia } from '../../../utils/media';
import type { StrapiData, StrapiMedia } from '../../../types/strapi';

// --- Strapi DTOs ---

interface StrapiResumenArticleAttrs {
    title: string;
    summary?: string;
    content?: string;
    author?: string;
    image?: StrapiMedia;
    audio?: StrapiMedia;
    publishedAt: string;
}

interface StrapiPodcastAttrs {
    title: string;
    description?: string;
    duration: string;
    image?: StrapiMedia;
    audio?: StrapiMedia;
    publishedAt: string;
}

interface StrapiPhotoAttrs {
    title: string;
    photographer?: string;
    image?: StrapiMedia;
    publishedAt: string;
}

interface StrapiCartoonAttrs {
    title: string;
    artist?: string;
    image?: StrapiMedia;
    publishedAt: string;
}

// --- Normalizers ---

function normalizeResumenArticle(item: StrapiData<StrapiResumenArticleAttrs>): ResumenArticle {
    const { id, attributes } = item;
    return {
        id: id.toString(),
        title: attributes.title,
        summary: attributes.summary,
        content: attributes.content,
        author: attributes.author,
        imageUrl: getStrapiMedia(attributes.image?.data?.attributes?.url) || '',
        audioUrl: getStrapiMedia(attributes.audio?.data?.attributes?.url) || undefined,
    };
}

function normalizePodcast(item: StrapiData<StrapiPodcastAttrs>): ResumenPodcast {
    const { id, attributes } = item;
    return {
        id: id.toString(),
        title: attributes.title,
        description: attributes.description,
        duration: attributes.duration,
        imageUrl: getStrapiMedia(attributes.image?.data?.attributes?.url) || '',
        audioUrl: getStrapiMedia(attributes.audio?.data?.attributes?.url) || '',
        date: attributes.publishedAt,
    };
}

function normalizePhoto(item: StrapiData<StrapiPhotoAttrs>): ResumenPhoto {
    const { id, attributes } = item;
    return {
        id: id.toString(),
        title: attributes.title,
        photographer: attributes.photographer,
        imageUrl: getStrapiMedia(attributes.image?.data?.attributes?.url) || '',
    };
}

function normalizeCartoon(item: StrapiData<StrapiCartoonAttrs>): ResumenCartoon {
    const { id, attributes } = item;
    return {
        id: id.toString(),
        title: attributes.title,
        artist: attributes.artist,
        imageUrl: getStrapiMedia(attributes.image?.data?.attributes?.url) || '',
    };
}

// --- API Service ---

export const resumenApi = {
    getLas5Articles: async (date: string) => {
        return withMockFallback<ResumenArticle[]>(
            async () => {
                const response = await strapiClient.get<StrapiResumenArticleAttrs>('/resumen-articles', {
                    'filters[type][$eq]': 'las-5',
                    'filters[date][$eq]': date,
                    'populate': '*'
                });
                if (Array.isArray(response.data)) {
                    return response.data.map(normalizeResumenArticle);
                }
                return [];
            },
            MOCK_LAS_5,
            'resumen/las-5'
        );
    },
    getOpinionArticles: async (date: string) => {
        return withMockFallback<ResumenArticle[]>(
            async () => {
                const response = await strapiClient.get<StrapiResumenArticleAttrs>('/resumen-articles', {
                    'filters[type][$eq]': 'opinion',
                    'filters[date][$eq]': date,
                    'populate': '*'
                });
                if (Array.isArray(response.data)) {
                    return response.data.map(normalizeResumenArticle);
                }
                return [];
            },
            MOCK_OPINION,
            'resumen/opinion'
        );
    },
    getPodcast: async (date: string) => {
        return withMockFallback<ResumenPodcast>(
            async () => {
                const response = await strapiClient.get<StrapiPodcastAttrs>('/resumen-podcasts', {
                    'filters[date][$eq]': date,
                    'populate': '*'
                });
                // Assuming single podcast per day, but API returns array
                if (Array.isArray(response.data) && response.data.length > 0) {
                    return normalizePodcast(response.data[0]);
                }
                throw new Error('No podcast found');
            },
            MOCK_PODCAST,
            'resumen/podcast'
        );
    },
    getPhotos: async (date: string) => {
        return withMockFallback<ResumenPhoto[]>(
            async () => {
                const response = await strapiClient.get<StrapiPhotoAttrs>('/resumen-photos', {
                    'filters[date][$eq]': date,
                    'populate': '*'
                });
                if (Array.isArray(response.data)) {
                    return response.data.map(normalizePhoto);
                }
                return [];
            },
            MOCK_PHOTOS,
            'resumen/photos'
        );
    },
    getCartoons: async (date: string) => {
        return withMockFallback<ResumenCartoon[]>(
            async () => {
                const response = await strapiClient.get<StrapiCartoonAttrs>('/resumen-cartoons', {
                    'filters[date][$eq]': date,
                    'populate': '*'
                });
                if (Array.isArray(response.data)) {
                    return response.data.map(normalizeCartoon);
                }
                return [];
            },
            MOCK_CARTOONS,
            'resumen/cartoons'
        );
    },
    getArticleById: async (id: string) => {
        // For now, we simulate fetching by ID from our mocks if the API fails
        const mockArticle = [...MOCK_LAS_5, ...MOCK_OPINION].find(a => a.id === id);
        return withMockFallback<ResumenArticle | undefined>(
            async () => {
                const response = await strapiClient.getOne<StrapiResumenArticleAttrs>('/resumen-articles', id, {
                    'populate': '*'
                });
                if (response.data && !Array.isArray(response.data)) {
                    return normalizeResumenArticle(response.data);
                }
                return undefined;
            },
            mockArticle,
            `resumen/articles/${id}`
        );
    }
};
