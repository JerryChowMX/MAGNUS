import { useState, useEffect } from 'react';
import { noticiasApi } from '../services/noticiasApi';
import type { NoticiasArticle } from '../../../types/noticias';

export const useNoticiasArticles = (date: string) => {
    const [articles, setArticles] = useState<NoticiasArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const { data, isFallback } = await noticiasApi.getArticlesByDate(date);
                setArticles(data);
                setIsFallback(isFallback);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch'));
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [date]);

    return { articles, isLoading, error, isFallback };
};
