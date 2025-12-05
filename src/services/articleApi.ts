import { strapiClient } from "../api/strapiClient";
import type { StrapiArticleAttributes, StrapiCollectionResponse, StrapiData, StrapiArticle } from "../types/strapi";

// Helper to normalize Strapi response to frontend-friendly format
function normalizeArticle(data: StrapiData<StrapiArticleAttributes>): StrapiArticle {
  const attrs = data.attributes;
  return {
    documentId: data.id.toString(),
    title: attrs.title,
    slug: attrs.slug,
    excerpt: attrs.excerpt,
    publishedAt: attrs.publishedAt,
    reading_time: attrs.reading_time,
    hero_image: attrs.hero_image?.data ? {
      url: attrs.hero_image.data.attributes.url,
      alternativeText: attrs.hero_image.data.attributes.alternativeText || undefined
    } : undefined,
    author: attrs.author?.data ? {
      name: attrs.author.data.attributes.name,
      slug: attrs.author.data.attributes.slug,
      profile_picture: attrs.author.data.attributes.profile_picture?.data ? {
        url: attrs.author.data.attributes.profile_picture.data.attributes.url
      } : undefined
    } : undefined,
    category: attrs.category?.data ? {
      name: attrs.category.data.attributes.name,
      slug: attrs.category.data.attributes.slug,
      color: attrs.category.data.attributes.color
    } : undefined,
    tags: attrs.tags?.data?.map(tag => ({
      name: tag.attributes.name,
      slug: tag.attributes.slug
    })) || []
  };
}

export const articleApi = {
  async getArticles(page = 1, pageSize = 10): Promise<{ articles: StrapiArticle[] }> {
    // Strapi REST API with proper query string format
    const params = new URLSearchParams({
      'populate': '*',
      'sort[0]': 'publishedAt:desc',
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString()
    });

    const response = await strapiClient.get<StrapiCollectionResponse<StrapiArticleAttributes>>(
      `/articles?${params.toString()}`
    );

    return { articles: response.data.map(normalizeArticle) };
  },

  async getArticleBySlug(slug: string): Promise<StrapiArticle | null> {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug,
      'populate': '*'
    });

    const response = await strapiClient.get<StrapiCollectionResponse<StrapiArticleAttributes>>(
      `/articles?${params.toString()}`
    );

    return response.data?.[0] ? normalizeArticle(response.data[0]) : null;
  }
};
