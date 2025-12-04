import React, { useState } from 'react';
import { Display } from '../Typography/Typography';
import './styles.css';

interface AiChatBarExpandedProps {
    onClose: () => void;
}

export const AiChatBarExpanded: React.FC<AiChatBarExpandedProps> = ({ onClose }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([
        { text: 'Hola, soy Magnus. ¿En qué puedo ayudarte hoy?', sender: 'ai' }
    ]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');
        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { text: 'Esta es una respuesta simulada de Magnus AI.', sender: 'ai' }]);
        }, 1000);
    };

    return (
        <div className="ai-chat-modal-overlay" onClick={onClose}>
            <div className="ai-chat-modal-content" onClick={e => e.stopPropagation()}>
                <div className="ai-chat-header">
                    <Display>MAGNUS</Display>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
                </div>

                <div className="ai-chat-body">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className="ai-chat-footer">
                    <div className="ai-chat-bar-collapsed" style={{ width: '100%', cursor: 'default' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Escribe tu pregunta..."
                            style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                fontSize: '16px',
                                color: 'var(--color-text-primary)'
                            }}
                        />
                        <button onClick={handleSend} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            <div className="ai-chat-bar-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
