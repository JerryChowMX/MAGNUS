import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrolledHeader } from '../../../hooks/useScrolledHeader';
import './HeaderContent.css';

export interface HeaderContentProps {
    variant?: "light" | "dark";
    onBack?: () => void;
    onShare?: () => void;
}

const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ShareIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const HeaderContent: React.FC<HeaderContentProps> = ({
    variant = "light",
    onBack,
    onShare
}) => {
    const { isScrolled } = useScrolledHeader();
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleShare = async () => {
        if (onShare) {
            onShare();
            return;
        }

        // Default native share
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            console.log('Web Share API not supported');
            // Fallback: Copy to clipboard or show modal (could be implemented later)
            alert('Share functionality not supported on this browser/device context.');
        }
    };

    return (
        <header className={`header-content header-content--${variant} ${isScrolled ? 'header-content--scrolled' : ''}`}>
            {/* Left: Back Button */}
            <button className="header-content__back" onClick={handleBack}>
                <BackIcon />
            </button>

            {/* Center: Logo Block */}
            <div className="header-content__logo-block">
                <div className="header-content__logo">MAGNUS</div>
                <div className="header-content__vanguardia">VANGUARDIA</div>
            </div>

            {/* Right: Share Button */}
            <button className="header-content__share" onClick={handleShare}>
                <ShareIcon />
            </button>
        </header>
    );
};
