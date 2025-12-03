import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useNoticiasDate = () => {
    const { date } = useParams<{ date: string }>();
    const navigate = useNavigate();

    // Default to today if no date in URL (though routing should handle this)
    const currentDate = date || new Date().toISOString().split('T')[0];

    const handleDateChange = useCallback((newDate: string) => {
        navigate(`/NoticiasHub/${newDate}`);
    }, [navigate]);

    return {
        currentDate,
        handleDateChange
    };
};
