import { useState, useEffect } from 'react';
import { resumenApi } from '../services/resumenApi';
import type { ResumenPodcast } from '../types/resumen.types';

export const useResumenPodcast = (date: string) => {
    const [podcast, setPodcast] = useState<ResumenPodcast | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await resumenApi.getPodcast(date);
                setPodcast(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch'));
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [date]);

    return { podcast, isLoading, error };
};
