import { useState, useEffect } from 'react';
import { resumenApi } from '../services/resumenApi';
import type { ResumenCartoon } from '../types/resumen.types';

export const useResumenCartones = (date: string) => {
    const [cartoons, setCartoons] = useState<ResumenCartoon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await resumenApi.getCartoons(date);
                setCartoons(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch'));
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [date]);

    return { cartoons, isLoading, error };
};
