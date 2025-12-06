import { useState } from 'react';
// Clean quote component without SVG icons
import { PageWrapper } from '../../../../components/Layout/PageWrapper';
import { HeaderContent } from '../../../../modules/noticiasHub/components/HeaderContent';
import { Heading } from '../../../../components/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/routes';

export const PlaygroundQuote = () => {
    const navigate = useNavigate();
    const [showAuthor, setShowAuthor] = useState(false);

    const toggleQuote = () => {
        setShowAuthor(!showAuthor);
    };

    return (
        <PageWrapper>
            <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
                <HeaderContent
                    onBack={() => navigate(routes.PLAYGROUND_ARTICLE_COMPONENTS)}
                />

                <div style={{ padding: '24px' }}>
                    <Heading level={2} style={{ marginBottom: '8px', fontSize: '1.25rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Playground: Quote
                    </Heading>
                    <Heading level={1} style={{ marginBottom: '32px', fontFamily: '"Blinker", sans-serif', fontWeight: 800, fontSize: '2.5rem', lineHeight: '1.1' }}>
                        FINAL DESIGN
                    </Heading>

                    {/* Final Quote Design - Tap to Toggle */}
                    <div
                        onClick={toggleQuote}
                        style={{
                            position: 'relative',
                            backgroundColor: '#FFF6F0', // Soft cream-orange
                            padding: '24px 24px 20px 24px', // Better vertical balance
                            borderLeft: '8px solid #0076ab', // Magnus Blue bar - 8px thick
                            cursor: 'pointer',
                            marginBottom: '40px',
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
                            position: 'absolute', // Always absolute to maintain container size
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: '24px' // Add padding for text breathing room
                        }}>
                            {/* Quote Text */}
                            <p style={{
                                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                                fontWeight: 700, // Bold
                                fontStyle: 'italic', // Italic
                                fontSize: '1.375rem', // ~22px
                                lineHeight: '1.4',
                                color: '#000000', // Pure black
                                margin: 0
                            }}>
                                Three can keep a secret, if two of them are dead.
                            </p>
                        </div>

                        {/* Author State */}
                        <div style={{
                            opacity: showAuthor ? 1 : 0,
                            transition: 'opacity 450ms ease 40ms', // Slight delay
                            position: 'absolute', // Always absolute to maintain container size
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '24px', // Add padding for text breathing room
                            pointerEvents: showAuthor ? 'auto' : 'none'
                        }}>
                            <p style={{
                                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                                fontSize: '1.25rem', // ~20px
                                fontWeight: 500, // Medium
                                color: '#545454', // Soft gray
                                margin: 0,
                                textAlign: 'center'
                            }}>
                                – Benjamin Franklin
                            </p>
                        </div>
                    </div>

                    {/* Instruction */}
                    <div style={{
                        padding: '16px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '8px',
                        marginBottom: '24px'
                    }}>
                        <p style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '0.875rem',
                            color: '#6B7280',
                            margin: 0,
                            textAlign: 'center'
                        }}>
                            👆 Tap the quote to toggle between quote and author
                        </p>
                    </div>

                    {/* Design Notes */}
                    <div style={{
                        borderTop: '1px solid #E5E7EB',
                        paddingTop: '24px'
                    }}>
                        <h3 style={{
                            fontFamily: '"Blinker", sans-serif',
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: '#111827',
                            marginBottom: '12px'
                        }}>
                            Design Specifications (✅ Clean & Simple)
                        </h3>
                        <ul style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '0.875rem',
                            color: '#4B5563',
                            lineHeight: '1.6',
                            paddingLeft: '20px'
                        }}>
                            <li>✅ Background: #FFF6F0 (soft cream-orange)</li>
                            <li>✅ Left bar: #0076AB (Magnus Blue, 6px thick, FLUSH - no gap)</li>
                            <li>✅ Quote text: #000000 (black, bold, italic, 22px)</li>
                            <li>✅ Author text: #545454 (soft gray, 20px)</li>
                            <li>✅ Padding: 24px (better balance)</li>
                            <li>✅ Transitions: 350ms ease (smooth animations)</li>
                            <li>✅ Mobile-first tap interaction</li>
                        </ul>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
