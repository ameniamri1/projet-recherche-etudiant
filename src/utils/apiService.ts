
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les appels API avec axios
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token d'authentification à chaque requête
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs globalement
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Gérer les erreurs d'authentification (401)
        if (error.response && error.response.status === 401) {
          // Rediriger vers la page de connexion si le token est expiré ou invalide
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Méthode GET
  async get<T>(endpoint: string, params?: any): Promise<T> {
    const config: AxiosRequestConfig = {};
    if (params) {
      config.params = params;
    }
    const response: AxiosResponse<T> = await this.api.get(endpoint, config);
    return response.data;
  }

  // Méthode GET qui retourne un Blob (pour les téléchargements)
  async getWithBlob(endpoint: string): Promise<Blob> {
    const response = await this.api.get(endpoint, {
      responseType: 'blob'
    });
    return response.data;
  }

  // Méthode POST
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(endpoint, data);
    return response.data;
  }

  // Méthode PUT
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(endpoint, data);
    return response.data;
  }

  // Méthode DELETE
  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(endpoint);
    return response.data;
  }
}

export default new ApiService();
