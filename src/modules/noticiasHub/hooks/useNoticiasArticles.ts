import { useState, useEffect } from 'react';
import { noticiasApi } from '../services/noticiasApi';
import type { NoticiasArticle } from '../types/noticias.types';

export const useNoticiasArticles = (date: string) => {
    const [articles, setArticles] = useState<NoticiasArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const data = await noticiasApi.getArticlesByDate(date);
                setArticles(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch articles'));
            } finally {
                setIsLoading(false);
            }
        };

        if (date) {
            fetchArticles();
        }
    }, [date]);

    return { articles, isLoading, error };
};
