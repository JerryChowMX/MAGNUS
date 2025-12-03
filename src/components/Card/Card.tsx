import React from 'react';
import './Card.css';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    padding = "md"
}) => {
    const isInteractive = !!onClick;
    const paddingClass = padding !== "none" ? `section--padding-${padding}` : ''; // Reusing section padding logic or define specific card padding
    // Actually, let's use inline style or specific class for internal padding if needed, 
    // but usually cards have their own padding logic. 
    // Let's stick to a simple padding class map.

    const getPaddingClass = (p: string) => {
        switch (p) {
            case 'sm': return '8px';
            case 'md': return '16px';
            case 'lg': return '24px';
            default: return '0';
        }
    };

    return (
        <div
            className={`card ${isInteractive ? 'card--interactive' : ''} ${className}`}
            onClick={onClick}
            style={{ padding: getPaddingClass(padding) }}
        >
            {children}
        </div>
    );
};
