import React from 'react';
import { SocialButton } from '../../../components/Button/SocialButton';
import './SocialLoginButtons.css';

export const SocialLoginButtons: React.FC = () => {
    return (
        <div className="social-login-buttons">
            <SocialButton
                provider="google"
                onClick={() => console.log('Login with Google')}
            />
            <SocialButton
                provider="apple"
                onClick={() => console.log('Login with Apple')}
            />
        </div>
    );
};
