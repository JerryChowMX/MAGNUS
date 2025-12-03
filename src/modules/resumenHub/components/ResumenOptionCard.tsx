import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumenOptionCard.css';

export interface ResumenOptionCardProps {
    icon: ReactNode;
    label: string;
    href: string;
    variant?: 'light' | 'dark';
}

export const ResumenOptionCard: React.FC<ResumenOptionCardProps> = ({
    icon,
    label,
    href,
    variant = 'light'
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (href.startsWith('http')) {
            window.location.href = href;
        } else {
            navigate(href);
        }
    };

    return (
        <button
            className={`resumen-option-card resumen-option-card--${variant}`}
            onClick={handleClick}
        >

            <div className="resumen-option-card__icon">
                {icon}
            </div>
            <div className="resumen-option-card__label">
                {label}
            </div>
        </button>
    );
};
