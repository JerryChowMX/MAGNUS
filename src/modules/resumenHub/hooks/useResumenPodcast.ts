import { useState, useEffect } from 'react';
import { resumenApi } from '../services/resumenApi';
import type { ResumenPodcast } from '../../../types/resumen';

export const useResumenPodcast = (date: string) => {
    const [podcast, setPodcast] = useState<ResumenPodcast | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const { data, isFallback } = await resumenApi.getPodcast(date);
                setPodcast(data);
                setIsFallback(isFallback);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch'));
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [date]);

    return { podcast, isLoading, error, isFallback };
};
