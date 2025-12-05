/**
 * Environment variable validation and access
 * Ensures required environment variables are present at startup
 */

interface EnvVars {
    VITE_API_URL?: string;
    VITE_STRAPI_URL: string;
    VITE_STRAPI_TOKEN?: string;
    VITE_POSTHOG_KEY?: string;
    VITE_POSTHOG_HOST?: string;
}

class EnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvironmentError';
    }
}

/**
 * Validates that all required environment variables are present
 * Throws EnvironmentError if any required vars are missing
 */
function validateEnv(): EnvVars {
    const errors: string[] = [];

    // Required variables
    const VITE_STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

    if (!VITE_STRAPI_URL) {
        errors.push('VITE_STRAPI_URL is required. Set it in your .env file (e.g., http://localhost:1337/api)');
    }

    // Optional but recommended variables
    const warnings: string[] = [];

    if (!import.meta.env.VITE_STRAPI_TOKEN) {
        warnings.push('VITE_STRAPI_TOKEN is not set. Some API endpoints may not work.');
    }

    if (!import.meta.env.VITE_POSTHOG_KEY) {
        warnings.push('VITE_POSTHOG_KEY is not set. Analytics will be disabled.');
    }

    // Log warnings in development
    if (import.meta.env.DEV && warnings.length > 0) {
        console.warn('[Environment] Warnings:');
        warnings.forEach(warning => console.warn(`  - ${warning}`));
    }

    // Throw if required vars are missing
    if (errors.length > 0) {
        const errorMessage = [
            '❌ Missing required environment variables:',
            ...errors.map(e => `  - ${e}`),
            '',
            'Please create a .env file in the project root with the required variables.',
            'See .env.example for reference.'
        ].join('\n');

        throw new EnvironmentError(errorMessage);
    }

    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_STRAPI_URL,
        VITE_STRAPI_TOKEN: import.meta.env.VITE_STRAPI_TOKEN,
        VITE_POSTHOG_KEY: import.meta.env.VITE_POSTHOG_KEY,
        VITE_POSTHOG_HOST: import.meta.env.VITE_POSTHOG_HOST,
    };
}

// Validate on module load
export const env = validateEnv();

// Export individual validated vars for convenience
export const STRAPI_URL = env.VITE_STRAPI_URL;
export const STRAPI_TOKEN = env.VITE_STRAPI_TOKEN;
export const API_URL = env.VITE_API_URL || '';
export const POSTHOG_KEY = env.VITE_POSTHOG_KEY;
export const POSTHOG_HOST = env.VITE_POSTHOG_HOST;
