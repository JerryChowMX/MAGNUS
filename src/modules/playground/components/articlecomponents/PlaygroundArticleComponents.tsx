import { PageWrapper } from '../../../../components/Layout/PageWrapper';
import { HeaderContent } from '../../../../modules/noticiasHub/components/HeaderContent';
import { Heading, Text } from '../../../../components/Typography/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/routes';

// Simple list component for playground menu - ready to be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaygroundLink = ({ to, title, description }: { to: string, title: string, description: string }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '16px' }}>
        <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#fff', transition: 'all 0.2s' }}>
            <Text variant="body" style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{title}</Text>
            <Text variant="caption" style={{ color: '#6B7280' }}>{description}</Text>
        </div>
    </Link>
);

export const PlaygroundArticleComponents = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
                <HeaderContent
                    onBack={() => navigate(routes.playgroundComponents)}
                />

                <div style={{ padding: '24px' }}>
                    <Heading level={1} style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Article Components</Heading>
                    <Text variant="body" style={{ color: '#6B7280', marginBottom: '24px' }}>
                        Individual components used in article pages.
                    </Text>

                    <PlaygroundLink
                        to={routes.PLAYGROUND_RECOMMENDED_ARTICLES}
                        title="Recommended Articles (Carousel)"
                        description="Horizontal scrollable list of recommended articles."
                    />

                    <PlaygroundLink
                        to={routes.PLAYGROUND_AUTHOR_CARD}
                        title="Author Card"
                        description="Author information card component."
                    />

                </div>
            </div>
        </PageWrapper>
    );
};
