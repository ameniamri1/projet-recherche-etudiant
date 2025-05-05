
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api.config';

// Création de l'instance axios
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les réponses et erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Gestion des erreurs comme l'expiration du token
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si le token est expiré
      localStorage.removeItem('auth_token');
      localStorage.removeItem('currentUserId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service API générique
export class ApiService {
  static async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};
      if (params) {
        config.params = params;
      }
      
      const response: AxiosResponse<T> = await apiClient.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  static async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  static async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

export default ApiService;
