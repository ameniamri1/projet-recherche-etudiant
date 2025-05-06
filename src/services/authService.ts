
import { User, AuthRequest, AuthResponse, SignupRequest } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer l'authentification
export const AuthService = {
  // Connecter un utilisateur
  login: async (email: string, password: string): Promise<{ user: User, token: string }> => {
    try {
      const authRequest: AuthRequest = { email, password };
      const response = await ApiService.post<AuthResponse>(
        `${API_CONFIG.ENDPOINTS.AUTH}/login`, 
        authRequest
      );
      
      // Stocker le token dans le localStorage
      localStorage.setItem('auth_token', response.token);
      
      // Créer l'objet utilisateur à partir de la réponse
      const user: User = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role as User['role']
      };
      
      return { user, token: response.token };
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  },

  // Inscrire un nouvel utilisateur
  register: async (data: Omit<SignupRequest, "role"> & { role: User["role"] }): Promise<User> => {
    try {
      const response = await ApiService.post<User>(
        `${API_CONFIG.ENDPOINTS.AUTH}/register`, 
        data
      );
      return response;
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
    }
  },

  // Récupérer l'utilisateur actuellement connecté
  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await ApiService.get<User>(`${API_CONFIG.ENDPOINTS.AUTH}/me`);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  },

  // Déconnecter un utilisateur
  logout: async (): Promise<void> => {
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Obtenir le token JWT
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
};

export default AuthService;
