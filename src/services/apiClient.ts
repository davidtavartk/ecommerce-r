import { API_URL } from '@/constants/url';
import { getCookie } from '@/utils/browser';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let token: string | null = null;

  // Server-side: read from headers, Client-side: read from document.cookie
  if (typeof window === 'undefined') {
    // Server-side - pass cookies from the component
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    token = cookieStore.get('accessToken')?.value || null;
  } else {
    // Client-side
    token = getCookie('accessToken');
  }

  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const error = new Error(errorData.message || 'Request failed');
    (error as any).status = response.status;
    (error as any).data = errorData;
    throw error;
  }

  return response.json();
}
