import { PageWrapper } from '../../../../components/Layout/PageWrapper';
import { HeaderContent } from '../../../../modules/noticiasHub/components/HeaderContent';
import { Heading, Text } from '../../../../components/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/routes';

export const PlaygroundEmbed = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
                <HeaderContent
                    onBack={() => navigate(routes.PLAYGROUND_ARTICLE_COMPONENTS)}
                />

                <div style={{ padding: '24px' }}>
                    <Heading level={2} style={{ marginBottom: '16px' }}>Embed Component</Heading>
                    <Text variant="body" style={{ color: '#6B7280', marginBottom: '24px' }}>
                        This is the playground for the Embed component renderer. Content will be added here later.
                    </Text>

                    {/* Placeholder for future content */}
                    <div style={{ padding: '24px', border: '1px dashed #E5E7EB', borderRadius: '12px', textAlign: 'center' }}>
                        <Text variant="caption">Embed Renderer Construction Area</Text>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
