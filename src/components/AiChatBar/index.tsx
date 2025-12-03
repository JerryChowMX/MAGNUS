import React, { useState } from 'react';
import { AiChatBarCollapsed } from './AiChatBarCollapsed';
import { AiChatBarExpanded } from './AiChatBarExpanded';

export const AiChatBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && <AiChatBarCollapsed onClick={() => setIsOpen(true)} />}
            {isOpen && <AiChatBarExpanded onClose={() => setIsOpen(false)} />}
        </>
    );
};
