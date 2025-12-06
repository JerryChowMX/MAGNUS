import { useState } from 'react';

interface ArticleQuoteProps {
    quote: string;
    author: string;
}

export const ArticleQuote = ({ quote, author }: ArticleQuoteProps) => {
    const [showAuthor, setShowAuthor] = useState(false);

    const toggleQuote = () => {
        setShowAuthor(!showAuthor);
    };

    return (
        <div
            onClick={toggleQuote}
            style={{
                position: 'relative',
                backgroundColor: '#FFF6F0', // Soft cream-orange
                padding: '24px 24px 20px 24px',
                borderLeft: '8px solid #0076ab', // Magnus Blue bar
                cursor: 'pointer',
                marginBottom: '24px',
                height: '150px', // Fixed height to prevent size shift
                display: 'flex',
                alignItems: 'center',
                transition: 'all 450ms ease'
            }}
        >
            {/* Quote State */}
            <div style={{
                opacity: showAuthor ? 0 : 1,
                transition: 'opacity 450ms ease',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '24px'
            }}>
                <p style={{
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    fontSize: '1.375rem', // ~22px
                    lineHeight: '1.4',
                    color: '#000000',
                    margin: 0
                }}>
                    {quote}
                </p>
            </div>

            {/* Author State */}
            <div style={{
                opacity: showAuthor ? 1 : 0,
                transition: 'opacity 450ms ease 40ms',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                pointerEvents: showAuthor ? 'auto' : 'none'
            }}>
                <p style={{
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontSize: '1.25rem', // ~20px
                    fontWeight: 500,
                    color: '#545454',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    – {author}
                </p>
            </div>
        </div>
    );
};
