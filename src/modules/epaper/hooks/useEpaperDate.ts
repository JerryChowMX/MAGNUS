import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useEpaperDate = () => {
    const { date } = useParams<{ date: string }>();
    const navigate = useNavigate();

    // Default to today if no date in URL
    const currentDate = date || new Date().toISOString().split('T')[0];

    const handleDateChange = useCallback((newDate: string) => {
        navigate(`/EPaper/${newDate}`);
    }, [navigate]);

    return {
        currentDate,
        handleDateChange
    };
};
