import { useState, useEffect } from 'react';
import { noticiasApi } from '../services/noticiasApi';
import type { NoticiasArticle } from '../types/noticias.types';

export const useNoticiasArticle = (slug: string) => {
    const [article, setArticle] = useState<NoticiasArticle | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true);
            try {
                const data = await noticiasApi.getArticleBySlug(slug);
                setArticle(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch article'));
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchArticle();
        }
    }, [slug]);

    return { article, isLoading, error };
};
