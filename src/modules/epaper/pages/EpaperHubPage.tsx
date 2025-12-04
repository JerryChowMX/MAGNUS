import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../../../components/Layout/PageWrapper';
import { Section, Grid } from '../../../components/Layout';
import { HeaderHubs } from '../../noticiasHub/components/HeaderHubs';
import { EpaperCard } from '../components/EpaperCard';
import { useEpaperDate } from '../hooks/useEpaperDate';
import './EpaperHubPage.css';

export const EpaperHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { date: _date } = useParams<{ date: string }>();
    const { currentDate, handleDateChange } = useEpaperDate();

    const [editions, setEditions] = React.useState<Array<{ id: string; number: string; date: string }>>([]);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const observer = React.useRef<IntersectionObserver | null>(null);
    const lastEditionElementRef = React.useCallback((node: HTMLDivElement | null) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    // Mock data generation
    const generateEditions = (pageNum: number, count: number) => {
        const newEditions = [];
        const startId = (pageNum - 1) * count + 1;
        for (let i = 0; i < count; i++) {
            newEditions.push({
                id: `${startId + i}`,
                number: `${startId + i}`,
                date: currentDate
            });
        }
        return newEditions;
    };

    React.useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newEditions = generateEditions(page, 10);
            setEditions(prev => {
                // If page 1, replace. If > 1, append.
                // However, since we might trigger page 1 on date change, we should handle reset.
                // For simplicity here, we'll just append if page > 1, but we need to reset on date change.
                return page === 1 ? newEditions : [...prev, ...newEditions];
            });
            setHasMore(true); // In this mock, we always have more
            setIsLoading(false);
        }, 500);
    }, [page, currentDate]);

    // Reset when date changes
    React.useEffect(() => {
        setEditions([]);
        setPage(1);
        setHasMore(true);
    }, [currentDate]);

    return (
        <PageWrapper>
            <HeaderHubs
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onBack={() => navigate('/')}
            />

            <Section padding="md">
                <Grid columns={2} gap="md">
                    {editions.map((edition, index) => {
                        if (editions.length === index + 1) {
                            return (
                                <div ref={lastEditionElementRef} key={edition.id}>
                                    <EpaperCard
                                        date={edition.date}
                                        editionNumber={edition.number}
                                        onClick={() => navigate(`/EPaper/${currentDate}/${edition.number}`)}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <EpaperCard
                                    key={edition.id}
                                    date={edition.date}
                                    editionNumber={edition.number}
                                    onClick={() => navigate(`/EPaper/${currentDate}/${edition.number}`)}
                                />
                            );
                        }
                    })}
                </Grid>
                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
                        Loading more editions...
                    </div>
                )}
            </Section>
        </PageWrapper>
    );
};
