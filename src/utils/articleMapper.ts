import type { StrapiArticle } from '../types/strapi';
import type { ArticleStandard } from '../types/articles';

export const mapStrapiToStandard = (strapiArticle: StrapiArticle): ArticleStandard => {
    // 1. Map Content Blocks
    // Strapi might return 'blocks' (Rich Text) or we used 'content' in some types.
    // We normalize to an array for StandardOneArticle.
    let blocks = [];
    if (Array.isArray(strapiArticle.blocks)) {
        blocks = strapiArticle.blocks;
    } else if (typeof strapiArticle.blocks === 'string') {
        // Obsolete or simple text fallback
        blocks = [{ type: 'paragraph', text: strapiArticle.blocks }];
    } else {
        // Fallback if we have raw text content
        // @ts-ignore
        if (strapiArticle.content) {
            // @ts-ignore
            blocks = [{ type: 'paragraph', text: strapiArticle.content }];
        }
    }

    return {
        id: strapiArticle.documentId,
        layoutType: 'standard-one',
        title: strapiArticle.title,
        dek: strapiArticle.summary, // Mapping summary to dek
        slug: strapiArticle.slug,
        coverImage: strapiArticle.hero_image ? {
            url: strapiArticle.hero_image.url,
            alt: strapiArticle.hero_image.alternativeText,
            caption: strapiArticle.title // Default caption to title if missing
        } : undefined,
        category: {
            id: strapiArticle.category?.slug || 'general',
            name: strapiArticle.category?.name || 'General',
            slug: strapiArticle.category?.slug || 'general'
        },
        tags: strapiArticle.tags?.map(t => ({
            id: t.slug,
            name: t.name,
            slug: t.slug
        })) || [],
        publishedAt: strapiArticle.publishedAt,
        readTimeMinutes: strapiArticle.reading_time,
        author: {
            id: strapiArticle.author?.slug || 'unknown',
            name: strapiArticle.author?.name || 'Vanguardia',
            slug: strapiArticle.author?.slug || 'vanguardia',
            avatarUrl: strapiArticle.author?.profile_picture?.url,
            role: 'Columnista' // Placeholder, add to Strapi if needed
        },
        contentBlocks: blocks,
        relatedArticles: [] // TODO: Add logic to fetch related
    };
};
