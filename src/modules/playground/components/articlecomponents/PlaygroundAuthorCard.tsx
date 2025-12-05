import { PageWrapper } from '../../../../components/Layout/PageWrapper';
import { HeaderContent } from '../../../../modules/noticiasHub/components/HeaderContent';
import { Heading, Text } from '../../../../components/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/routes';
import { AuthorCard } from './AuthorCard';

export const PlaygroundAuthorCard = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
                <HeaderContent
                    onBack={() => navigate(routes.PLAYGROUND_ARTICLE_COMPONENTS)}
                />

                <div style={{ padding: '24px' }}>
                    <Heading level={1} style={{ fontSize: '1.5rem', marginBottom: 8 }}>Author Card</Heading>
                    <Text variant="body" style={{ color: '#6B7280', marginBottom: 24 }}>
                        Component for displaying author information in articles.
                    </Text>

                    {/* Example 1: Full Featured */}
                    <div style={{ marginBottom: 32 }}>
                        <Text variant="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>
                            Full Featured
                        </Text>
                        <AuthorCard
                            name="María González"
                            role="Editora Senior"
                            bio="Periodista especializada en política y economía con más de 15 años de experiencia cubriendo eventos nacionales e internacionales."
                            avatarUrl="https://i.pravatar.cc/150?img=5"
                            articleCount={127}
                            followersCount={12500}
                            onFollow={() => console.log('Follow clicked')}
                            onViewProfile={() => console.log('View profile clicked')}
                        />
                    </div>

                    {/* Example 2: Without Avatar Image */}
                    <div style={{ marginBottom: 32 }}>
                        <Text variant="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>
                            With Placeholder Avatar
                        </Text>
                        <AuthorCard
                            name="Carlos Ramírez"
                            role="Corresponsal"
                            bio="Reportero de investigación enfocado en temas de seguridad y justicia."
                            articleCount={89}
                            followersCount={8300}
                            onFollow={() => console.log('Follow clicked')}
                            onViewProfile={() => console.log('View profile clicked')}
                        />
                    </div>

                    {/* Example 3: Minimal (No Bio, No Stats, No Actions) */}
                    <div style={{ marginBottom: 32 }}>
                        <Text variant="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>
                            Minimal Version (Square Avatar)
                        </Text>
                        <AuthorCard
                            name="Ana Martínez"
                            role="Columnista"
                            avatarUrl="https://i.pravatar.cc/150?img=10"
                            variant="square"
                            centered
                        />
                    </div>

                    {/* Example 4: Already Following */}
                    <div style={{ marginBottom: 32 }}>
                        <Text variant="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>
                            Already Following
                        </Text>
                        <AuthorCard
                            name="Roberto Silva"
                            role="Editor de Deportes"
                            bio="Apasionado del deporte con cobertura en eventos olímpicos y mundiales."
                            avatarUrl="https://i.pravatar.cc/150?img=12"
                            articleCount={203}
                            followersCount={25400}
                            isFollowing={true}
                            onFollow={() => console.log('Unfollow clicked')}
                            onViewProfile={() => console.log('View profile clicked')}
                        />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
