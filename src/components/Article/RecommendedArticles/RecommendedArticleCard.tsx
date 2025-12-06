// import { routes } from '../../../../app/routes';

export interface RecommendedArticleCardProps {
    image: string;
    category: string;
    title: string;
    slug?: string; // Add slug for navigation
}

export const RecommendedArticleCard: React.FC<RecommendedArticleCardProps> = ({
    image,
    category,
    title,
    slug
}) => {
    const handleClick = () => {
        if (slug) {
            // Check if we are in staging or production to route correctly
            // For now, simple relative navigation or context aware
            // Ideally this component is smart enough to know context OR parent passes handler
            window.location.href = `/articulo/${slug}`; // Simple reload/nav for now, or use useNavigate
        }
    };

    return (
        <article
            className="flex-shrink-0 w-[240px] snap-start cursor-pointer group"
            onClick={handleClick}
            style={{
                flexShrink: 0,
                width: '280px',
                scrollSnapAlign: 'start',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}
        >
            <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '16/9',
                backgroundColor: '#F3F4F6'
            }}>
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#EF4444',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {category}
                </span>
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: '1.4',
                    margin: 0
                }}>
                    {title}
                </h3>
            </div>
        </article>
    );
};
