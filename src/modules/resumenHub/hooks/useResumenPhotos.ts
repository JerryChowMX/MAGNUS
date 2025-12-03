import { useState, useEffect } from 'react';
import { resumenApi } from '../services/resumenApi';
import type { ResumenPhoto } from '../types/resumen.types';

export const useResumenPhotos = (date: string) => {
    const [photos, setPhotos] = useState<ResumenPhoto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await resumenApi.getPhotos(date);
                setPhotos(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch'));
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [date]);

    return { photos, isLoading, error };
};
