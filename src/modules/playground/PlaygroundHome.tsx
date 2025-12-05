import { PageWrapper } from '../../components/Layout/PageWrapper';
import { Heading, Text } from '../../components/Typography/Typography';

export const PlaygroundHome = () => {
    return (
        <PageWrapper>
            <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
                <Heading level={1} style={{ marginBottom: '16px' }}>Home Feed Playground</Heading>
                <Text variant="body">
                    This sandbox will be used to design the home feed cards, sections, and daily summaries without relying on Strapi.
                </Text>
            </div>
        </PageWrapper>
    );
};
