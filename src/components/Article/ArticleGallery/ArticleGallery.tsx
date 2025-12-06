import { useState } from 'react';
import { StrapiGalleryImage } from '../types';

interface LightboxProps {
    images: StrapiGalleryImage[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    zIndex: 10001
                }}
                aria-label="Close lightbox"
            >
                ×
            </button>

            {/* Previous Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                style={{
                    position: 'absolute',
                    left: '20px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    zIndex: 10001
                }}
                aria-label="Previous image"
            >
                ‹
            </button>

            {/* Image */}
            <div
                style={{ maxWidth: '90%', maxHeight: '90%', textAlign: 'center' }}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[currentIndex].url}
                    alt={images[currentIndex].alt || images[currentIndex].caption || `Image ${currentIndex + 1}`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        objectFit: 'contain'
                    }}
                />
                {images[currentIndex].caption && (
                    <p style={{ color: '#fff', marginTop: '16px', fontSize: '1rem' }}>
                        {images[currentIndex].caption} ({currentIndex + 1}/{images.length})
                    </p>
                )}
            </div>

            {/* Next Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                style={{
                    position: 'absolute',
                    right: '20px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    zIndex: 10001
                }}
                aria-label="Next image"
            >
                ›
            </button>
        </div>
    );
};

interface ArticleGalleryProps {
    images: StrapiGalleryImage[];
}

export const ArticleGallery = ({ images }: ArticleGalleryProps) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '24px'
            }}>
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        onClick={() => openLightbox(index)}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            aspectRatio: '1',
                            position: 'relative'
                        }}
                    >
                        <img
                            src={img.url}
                            alt={img.alt || img.caption || `Gallery image ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={images}
                    currentIndex={currentIndex}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            )}
        </>
    );
};
