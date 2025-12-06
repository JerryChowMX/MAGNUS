interface ArticleAuthorProps {
    name: string;
}

export const ArticleAuthor = ({ name }: ArticleAuthorProps) => {
    return (
        <div style={{ marginBottom: '48px', maxWidth: '100%' }}>
            <div style={{
                padding: '32px 24px',
                backgroundColor: '#fff',
                textAlign: 'center',
                borderTop: '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB'
            }}>
                <span style={{
                    display: 'block',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#6B7280',
                    marginBottom: '8px'
                }}>
                    Por
                </span>
                <h4 style={{
                    fontFamily: '"Blinker", sans-serif',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#111827',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase'
                }}>
                    {name}
                </h4>
                <div style={{
                    width: '40px',
                    height: '2px',
                    backgroundColor: '#0076AB',
                    margin: '0 auto'
                }} />
            </div>
        </div>
    );
};
