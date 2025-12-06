import React from 'react';
import type { StrapiRichTextBlock } from '../types';

interface ArticleRichTextProps {
    blocks: StrapiRichTextBlock[];
}

export const ArticleRichText = ({ blocks }: ArticleRichTextProps) => {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    return (
        <div style={{ marginBottom: '24px' }}>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'heading':
                        return renderHeading(block, index);
                    case 'paragraph':
                        return renderParagraph(block, index);
                    case 'list':
                        return renderList(block, index);
                    default:
                        return null;
                }
            })}
        </div>
    );
};

const HEADING_STYLES: Record<number, React.CSSProperties> = {
    1: {
        fontFamily: '"Blinker", sans-serif',
        fontSize: '2.5rem',
        fontWeight: 800,
        lineHeight: '1.1',
        color: '#111827',
        marginBottom: '24px',
        marginTop: '32px'
    },
    2: {
        fontFamily: '"Blinker", sans-serif',
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: '1.2',
        color: '#111827',
        marginBottom: '20px',
        marginTop: '28px'
    },
    3: {
        fontFamily: '"Blinker", sans-serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: '1.3',
        color: '#111827',
        marginBottom: '16px',
        marginTop: '24px'
    },
    4: {
        fontFamily: '"Blinker", sans-serif',
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: '1.4',
        color: '#111827',
        marginBottom: '12px',
        marginTop: '20px'
    },
    5: {
        fontFamily: '"Inter", sans-serif',
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: '1.4',
        color: '#111827',
        marginBottom: '12px',
        marginTop: '16px'
    },
    6: {
        fontFamily: '"Inter", sans-serif',
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: '1.5',
        color: '#374151',
        marginBottom: '12px',
        marginTop: '16px'
    }
};

const renderHeading = (block: StrapiRichTextBlock, index: number) => {
    const level = block.level || 2;
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <HeadingTag key={index} style={HEADING_STYLES[level]}>
            {block.content}
        </HeadingTag>
    );
};

const renderParagraph = (block: StrapiRichTextBlock, index: number) => {
    return (
        <p
            key={index}
            style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.0625rem', // 17px
                lineHeight: '1.65',
                color: '#374151',
                marginBottom: '20px'
            }}
        >
            {block.content}
        </p>
    );
};

const renderList = (block: StrapiRichTextBlock, index: number) => {
    const ListTag = block.ordered ? 'ol' : 'ul';

    return (
        <ListTag
            key={index}
            style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.0625rem',
                lineHeight: '1.65',
                color: '#374151',
                marginBottom: '20px',
                paddingLeft: '24px'
            }}
        >
            {block.items?.map((item, itemIndex) => (
                <li
                    key={itemIndex}
                    style={{
                        marginBottom: '8px'
                    }}
                >
                    {item}
                </li>
            ))}
        </ListTag>
    );
};
