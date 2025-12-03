import React from 'react';
import type { ResumenPhoto } from '../types/resumen.types';
import './ResumenPhotoGallery.css';

export interface ResumenPhotoGalleryProps {
    photos: ResumenPhoto[];
}

export const ResumenPhotoGallery: React.FC<ResumenPhotoGalleryProps> = ({ photos }) => {
    return (
        <div className="resumen-photo-gallery">
            {photos.map(photo => (
                <div key={photo.id} className="resumen-photo-item" onClick={() => alert(`View photo: ${photo.title}`)}>
                    <img src={photo.imageUrl} alt={photo.title} loading="lazy" />
                </div>
            ))}
        </div>
    );
};
