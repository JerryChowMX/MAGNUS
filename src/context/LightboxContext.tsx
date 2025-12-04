import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface LightboxImage {
    src: string;
    alt?: string;
    caption?: string;
}

interface LightboxContextType {
    isOpen: boolean;
    activeImage: LightboxImage | null;
    openLightbox: (src: string, caption?: string, alt?: string) => void;
    closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

    const openLightbox = useCallback((src: string, caption?: string, alt?: string) => {
        setActiveImage({ src, caption, alt });
        setIsOpen(true);
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }, []);

    const closeLightbox = useCallback(() => {
        setIsOpen(false);
        setActiveImage(null);
        // Restore background scrolling
        document.body.style.overflow = '';
    }, []);

    return (
        <LightboxContext.Provider value={{ isOpen, activeImage, openLightbox, closeLightbox }}>
            {children}
        </LightboxContext.Provider>
    );
};

export const useLightbox = () => {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error('useLightbox must be used within a LightboxProvider');
    }
    return context;
};
