import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { useStrapiArticles } from '../../../hooks/useStrapiArticles';
import type { StrapiArticle } from '../../../hooks/useStrapiArticles';

const StrapiTestPage = () => {
    const { data: articles, isLoading, error } = useStrapiArticles();

    return (
        <PageWrapper>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-white">Strapi Integration Test</h1>

                {isLoading && <div className="text-white">Loading articles...</div>}

                {error && (
                    <div className="p-4 bg-red-900/50 border border-red-500 rounded text-red-200">
                        Error: {error.message}
                        <br />
                        Make sure Strapi is running at http://localhost:1337
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article: StrapiArticle) => (
                            <div key={article.documentId} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-lg hover:border-zinc-700 transition-all">
                                {article.hero_image && (
                                    <img
                                        src={`http://localhost:1337${article.hero_image.url}`}
                                        alt={article.hero_image.alternativeText || article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-white mb-2">{article.title}</h2>
                                    <p className="text-zinc-400 text-sm line-clamp-3">{article.excerpt}</p>

                                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                                        <span>{article.category?.name || 'Uncategorized'}</span>
                                        <span>{article.reading_time || 0} min read</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && !error && articles.length === 0 && (
                    <div className="text-zinc-500">No articles found in Strapi.</div>
                )}
            </div>
        </PageWrapper>
    );
};

export default StrapiTestPage;
