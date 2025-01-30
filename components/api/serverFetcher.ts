'use server';

const BACKEND_URL = `${process.env.BACKEND_URL}`;

// Helper function to add delay

export async function serverFetcher<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(BACKEND_URL + url, options);
    //todo manejar el no autorizado

    if (!response.ok) {
        const errorData = await response.json();
        console.error(`HTTP error! status: ${response.status} on url ${url}`);
        console.error(errorData);
        throw new Error(`${errorData.detail}`);
    }

    const data = await response.json();

    return data as T;
}

// Axios-like interface
/* export const serverFetcher = {
    get: <T>(url: string, options?: RequestInit) =>
        dataFetcher<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, data?: any, options?: RequestInit) =>
        dataFetcher<T>(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        }),
    put: <T>(url: string, data?: any, options?: RequestInit) =>
        dataFetcher<T>(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    delete: <T>(url: string, options?: RequestInit) =>
        dataFetcher<T>(url, { ...options, method: 'DELETE' }),
}; */
