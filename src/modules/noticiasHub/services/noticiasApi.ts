import type { NoticiasArticle } from '../types/noticias.types';

const MOCK_ARTICLES: NoticiasArticle[] = Array.from({ length: 25 }).map((_, index) => ({
    id: `article-${index + 1}`,
    title: `Noticia Importante del Día ${index + 1}`,
    imageUrl: `https://picsum.photos/seed/noticias-${index + 1}/800/600`,
    publishedAt: new Date().toISOString(),
    section: index % 3 === 0 ? "Saltillo" : index % 3 === 1 ? "Nacional" : "Deportes",
    summary: "Este es un resumen breve de la noticia para mostrar en la vista de detalle antes de seleccionar un formato.",
    content: "Contenido completo de la noticia..."
}));

export const noticiasApi = {
    getArticlesByDate: async (date: string): Promise<NoticiasArticle[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`Fetching articles for date: ${date}`);
        return MOCK_ARTICLES;
    },

    getArticleBySlug: async (slug: string): Promise<NoticiasArticle | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_ARTICLES.find(a => a.id === slug);
    }
};
