import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section } from '../../../components/Layout';
import { HeaderContent } from '../../noticiasHub/components/HeaderContent';
import { PdfViewer } from '../components/PdfViewer';
import { AiChatBar } from '../../../components/AiChatBar';
import './EpaperEditionPage.css';

export const EpaperEditionPage: React.FC = () => {
    const { date, editionNumber } = useParams<{ date: string; editionNumber: string }>();
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <HeaderContent
                onBack={() => navigate(`/EPaper/${date}`)}
                onShare={() => alert('Share clicked')}
            />

            <Section padding="none">
                <PdfViewer url={`http://example.com/epaper/${date}/${editionNumber}.pdf`} />
            </Section>

            <AiChatBar />
        </PageWrapper>
    );
};
