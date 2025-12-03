import { useState, useEffect } from 'react';
import { resumenApi } from '../services/resumenApi';
import type { ResumenCartoon } from '../../../types/resumen';

export const useResumenCartones = (date: string) => {
    const [cartoons, setCartoons] = useState<ResumenCartoon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const { data, isFallback } = await resumenApi.getCartoons(date);
                setCartoons(data);
                setIsFallback(isFallback);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch'));
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [date]);

    return { cartoons, isLoading, error, isFallback };
};
