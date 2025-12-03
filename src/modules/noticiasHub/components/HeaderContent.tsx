import React from 'react';
import { Stack, Container } from '../../../components/Layout';
import { Button } from '../../../components/Button/Button';
import { Headline } from '../../../components/Typography/Typography';
import { useScrolledHeader } from '../../../hooks/useScrolledHeader';
import './HeaderContent.css';

export interface HeaderContentProps {
    variant?: "light" | "dark";
    onBack?: () => void;
    onShare?: () => void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
    variant = "light",
    onBack,
    onShare
}) => {
    const { isScrolled } = useScrolledHeader();

    return (
        <header className={`header-content header-content--${variant} ${isScrolled ? 'header-content--scrolled' : ''}`}>
            <Container>
                <Stack direction="row" justify="between" align="center" className="header-content__inner">
                    <Button variant="ghost" onClick={onBack}>
                        &lt; Back
                    </Button>

                    <Headline level={2}>MAGNUS | VANGUARDIA</Headline>

                    <Button variant="ghost" onClick={onShare}>
                        [Share]
                    </Button>
                </Stack>
            </Container>
        </header>
    );
};
