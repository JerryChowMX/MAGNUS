

export interface StrapiClientConfig {
    baseUrl?: string;
    token?: string;
}

const DEFAULT_CONFIG: StrapiClientConfig = {
    baseUrl: import.meta.env.VITE_STRAPI_URL || "http://localhost:1337",
    token: import.meta.env.VITE_STRAPI_TOKEN,
};

class StrapiClient {
    private baseUrl: string;
    private token?: string;

    constructor(config: StrapiClientConfig = DEFAULT_CONFIG) {
        this.baseUrl = config.baseUrl || "http://localhost:1337";
        this.token = config.token;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
        const headers = {
            "Content-Type": "application/json",
            ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
            ...options?.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = new Error(`Strapi Request Failed: ${response.status} ${response.statusText}`);
            throw error;
        }

        return response.json();
    }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
        return this.request<T>(`${endpoint}${queryString}`, {
            method: "GET",
        });
    }

    async getOne<T>(endpoint: string, id: string | number, params?: Record<string, string>): Promise<T> {
        const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
        return this.request<T>(`${endpoint}/${id}${queryString}`, {
            method: "GET",
        });
    }
}

export const strapiClient = new StrapiClient();
