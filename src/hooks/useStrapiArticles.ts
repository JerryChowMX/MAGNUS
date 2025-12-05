import { useState, useEffect } from 'react';
import { articleApi } from '../services/articleApi';

export interface StrapiArticle {
    documentId: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    reading_time: number;
    hero_image?: {
        url: string;
        alternativeText?: string;
    };
    author?: {
        name: string;
        slug: string;
        profile_picture?: {
            url: string;
        };
    };
    category?: {
        name: string;
        slug: string;
        color: string;
    };
    tags?: Array<{
        name: string;
        slug: string;
    }>;
}

export const useStrapiArticles = (page = 1, pageSize = 10) => {
    const [data, setData] = useState<StrapiArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await articleApi.getArticles(page, pageSize);
                setData(response.articles || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load articles from Strapi'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [page, pageSize]);

    return { data, isLoading, error };
};
