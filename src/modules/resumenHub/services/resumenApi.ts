import type { ResumenArticle, ResumenPodcast, ResumenPhoto, ResumenCartoon } from '../types/resumen.types';

const MOCK_LAS_5: ResumenArticle[] = [
    { id: 'las5-1', title: 'Noticia Principal del Día', imageUrl: 'https://picsum.photos/seed/las5-1/800/600', banner: 'Principal', summary: 'Resumen de la noticia principal...' },
    { id: 'las5-2', title: 'Editorial Importante', imageUrl: 'https://picsum.photos/seed/las5-2/800/600', banner: 'Editorial', summary: 'Resumen de la editorial...' },
    { id: 'las5-3', title: 'Suceso en Saltillo', imageUrl: 'https://picsum.photos/seed/las5-3/800/600', banner: 'Saltillo', summary: 'Resumen de Saltillo...' },
    { id: 'las5-4', title: 'Noticia de Finanzas', imageUrl: 'https://picsum.photos/seed/las5-4/800/600', banner: 'Dinero', summary: 'Resumen de finanzas...' },
    { id: 'las5-5', title: 'Reportaje Especial', imageUrl: 'https://picsum.photos/seed/las5-5/800/600', banner: 'Especial', summary: 'Resumen especial...' },
];

const MOCK_OPINION: ResumenArticle[] = [
    { id: 'op-1', title: 'La Columna del Director', imageUrl: 'https://picsum.photos/seed/op-1/800/600', banner: 'Columna', author: 'Armando Fuentes Aguirre', summary: 'Resumen de la columna...' },
    { id: 'op-2', title: 'Opinión Invitada', imageUrl: 'https://picsum.photos/seed/op-2/800/600', banner: 'Opinión', author: 'Sergio Sarmiento', summary: 'Resumen de la opinión...' },
    { id: 'op-3', title: 'Editorial del Día', imageUrl: 'https://picsum.photos/seed/op-3/800/600', banner: 'Editorial', author: 'Vanguardia', summary: 'Resumen de la editorial...' },
];

const MOCK_PODCAST: ResumenPodcast = {
    id: 'pod-1',
    title: 'El Podcast de Vanguardia: Edición Matutina',
    duration: '15:30',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
    imageUrl: 'https://picsum.photos/seed/podcast/800/800'
};

const MOCK_PHOTOS: ResumenPhoto[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `photo-${i}`,
    title: `Foto del día ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/photo-${i}/1200/800`,
    photographer: 'Fotógrafo Vanguardia'
}));

const MOCK_CARTOONS: ResumenCartoon[] = Array.from({ length: 3 }).map((_, i) => ({
    id: `cartoon-${i}`,
    title: `Cartón Político ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/cartoon-${i}/800/800`,
    artist: 'Monero'
}));

export const resumenApi = {
    getLas5Articles: async (_date: string): Promise<ResumenArticle[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_LAS_5;
    },
    getOpinionArticles: async (_date: string): Promise<ResumenArticle[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_OPINION;
    },
    getPodcast: async (_date: string): Promise<ResumenPodcast> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_PODCAST;
    },
    getPhotos: async (_date: string): Promise<ResumenPhoto[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_PHOTOS;
    },
    getCartoons: async (_date: string): Promise<ResumenCartoon[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_CARTOONS;
    },
    getArticleById: async (id: string): Promise<ResumenArticle | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...MOCK_LAS_5, ...MOCK_OPINION].find(a => a.id === id);
    }
};
