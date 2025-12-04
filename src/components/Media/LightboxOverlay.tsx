import React, { useState, useEffect, useRef } from 'react';
import { useLightbox } from '../../context/LightboxContext';
import { Icons } from '../Icons';
import './LightboxOverlay.css';

export const LightboxOverlay: React.FC = () => {
    const { isOpen, activeImage, closeLightbox } = useLightbox();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    // Reset state when opening new image
    useEffect(() => {
        if (isOpen) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen, activeImage]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeLightbox]);

    if (!isOpen || !activeImage) return null;

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(1, scale + delta), 4); // Max zoom 4x, Min 1x
        setScale(newScale);

        // Reset position if zoomed out
        if (newScale === 1) setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
            e.preventDefault(); // Prevent default drag behavior
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = () => {
        if (scale > 1) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        } else {
            setScale(2); // Double click to 2x zoom
        }
    };

    return (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
            <div className="lightbox-controls">
                <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close">
                    <Icons.x size={32} />
                </button>
            </div>

            <div
                className="lightbox-content"
                onWheel={handleWheel}
            >
                <div
                    className="lightbox-image-wrapper"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDoubleClick={handleDoubleClick}
                >
                    <img
                        ref={imageRef}
                        src={activeImage.src}
                        alt={activeImage.alt || ''}
                        className="lightbox-image"
                        draggable={false}
                    />
                </div>
            </div>

            {activeImage.caption && (
                <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
                    {activeImage.caption}
                </div>
            )}
        </div>
    );
};
