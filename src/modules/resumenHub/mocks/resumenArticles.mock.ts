import type { ResumenArticle } from '../../../types/resumen';

export const MOCK_LAS_5: ResumenArticle[] = [
    { id: 'las5-1', title: 'Noticia Principal del Día', imageUrl: 'https://picsum.photos/seed/las5-1/800/600', banner: 'Principal', summary: 'Resumen de la noticia principal...' },
    { id: 'las5-2', title: 'Editorial Importante', imageUrl: 'https://picsum.photos/seed/las5-2/800/600', banner: 'Editorial', summary: 'Resumen de la editorial...' },
    { id: 'las5-3', title: 'Suceso en Saltillo', imageUrl: 'https://picsum.photos/seed/las5-3/800/600', banner: 'Saltillo', summary: 'Resumen de Saltillo...' },
    { id: 'las5-4', title: 'Noticia de Finanzas', imageUrl: 'https://picsum.photos/seed/las5-4/800/600', banner: 'Dinero', summary: 'Resumen de finanzas...' },
    { id: 'las5-5', title: 'Reportaje Especial', imageUrl: 'https://picsum.photos/seed/las5-5/800/600', banner: 'Especial', summary: 'Resumen especial...' },
];

export const MOCK_OPINION: ResumenArticle[] = [
    { id: 'op-1', title: 'La Columna del Director', imageUrl: 'https://picsum.photos/seed/op-1/800/600', banner: 'Columna', author: 'Armando Fuentes Aguirre', summary: 'Resumen de la columna...' },
    { id: 'op-2', title: 'Opinión Invitada', imageUrl: 'https://picsum.photos/seed/op-2/800/600', banner: 'Opinión', author: 'Sergio Sarmiento', summary: 'Resumen de la opinión...' },
    { id: 'op-3', title: 'Editorial del Día', imageUrl: 'https://picsum.photos/seed/op-3/800/600', banner: 'Editorial', author: 'Vanguardia', summary: 'Resumen de la editorial...' },
];
