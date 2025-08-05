// lib/api-config.ts
// Create this file in your lib directory

export const API_CONFIG = {
  DEFAULT_API_URL: 'http://localhost:8000',
  
  getApiUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
                   process.env.API_URL || 
                   this.DEFAULT_API_URL;
    
    return apiUrl.replace(/\/$/, '');
  },

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.getApiUrl()}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  },

  async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.getApiUrl()}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(30000)
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }
};

export const getApiUrl = () => API_CONFIG.getApiUrl();
export const testApiConnection = () => API_CONFIG.testConnection();
export const makeApiRequest = <T>(endpoint: string, options?: RequestInit) => 
  API_CONFIG.makeRequest<T>(endpoint, options);