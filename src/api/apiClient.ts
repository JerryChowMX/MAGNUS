export interface ApiError extends Error {
    status?: number;
}

const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${input}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers ?? {}),
        },
    });

    if (!response.ok) {
        const error: ApiError = new Error("Request failed");
        error.status = response.status;
        throw error;
    }

    return (await response.json()) as T;
}

export const apiClient = {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
        request<T>(path, {
            method: "POST",
            body: JSON.stringify(body),
        }),
    put: <T>(path: string, body: unknown) =>
        request<T>(path, {
            method: "PUT",
            body: JSON.stringify(body),
        }),
    delete: <T>(path: string) =>
        request<T>(path, {
            method: "DELETE",
        }),
};
