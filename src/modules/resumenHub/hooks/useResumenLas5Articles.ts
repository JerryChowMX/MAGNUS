import { useState, useEffect } from 'react';
import { resumenApi } from '../services/resumenApi';
import type { ResumenArticle } from '../../../types/resumen';

export const useResumenLas5Articles = (date: string) => {
    const [articles, setArticles] = useState<ResumenArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const { data, isFallback } = await resumenApi.getLas5Articles(date);
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
