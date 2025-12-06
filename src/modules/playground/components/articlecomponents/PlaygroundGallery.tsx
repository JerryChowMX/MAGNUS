import { useState } from 'react';
import { PageWrapper } from '../../../../components/Layout/PageWrapper';
import { HeaderContent } from '../../../../modules/noticiasHub/components/HeaderContent';
import { Heading } from '../../../../components/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/routes';

// Mock gallery images
const MOCK_IMAGES = [
    { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', caption: 'Mountain Sunset' },
    { id: 2, url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', caption: 'City Skyline' },
    { id: 3, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', caption: 'Forest Path' },
    { id: 4, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', caption: 'Ocean Waves' },
];

// Lightbox Component
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: any) => {
    return (
        <div style={{
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
        }} onClick={onClose}>
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
            >
                ‹
            </button>

            {/* Image */}
            <div style={{ maxWidth: '90%', maxHeight: '90%', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                <img
                    src={images[currentIndex].url}
                    alt={images[currentIndex].caption}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        objectFit: 'contain'
                    }}
                />
                <p style={{ color: '#fff', marginTop: '16px', fontSize: '1rem' }}>
                    {images[currentIndex].caption} ({currentIndex + 1}/{images.length})
                </p>
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
            >
                ›
            </button>
        </div>
    );
};

export const PlaygroundGallery = () => {
    const navigate = useNavigate();
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
        setCurrentIndex((prev) => (prev + 1) % MOCK_IMAGES.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + MOCK_IMAGES.length) % MOCK_IMAGES.length);
    };

    return (
        <PageWrapper>
            <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
                <HeaderContent
                    onBack={() => navigate(routes.PLAYGROUND_ARTICLE_COMPONENTS)}
                />

                <div style={{ padding: '24px' }}>
                    <Heading level={2} style={{ marginBottom: '8px', fontSize: '1.25rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Playground: Gallery
                    </Heading>
                    <Heading level={1} style={{ marginBottom: '32px', fontFamily: '"Blinker", sans-serif', fontWeight: 800, fontSize: '2.5rem', lineHeight: '1.1' }}>
                        CLEAN GRID
                    </Heading>

                    {/* Clean Grid Gallery */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px'
                    }}>
                        {MOCK_IMAGES.map((img, index) => (
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
                                    alt={img.caption}
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

                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={MOCK_IMAGES}
                    currentIndex={currentIndex}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            )}
        </PageWrapper>
    );
};
