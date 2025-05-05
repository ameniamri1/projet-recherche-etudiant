
import { User } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur les utilisateurs
export const UserService = {
  // Récupérer tous les utilisateurs
  getUsers: async (): Promise<User[]> => {
    try {
      return await ApiService.get<User[]>(API_CONFIG.ENDPOINTS.USERS);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getUsers } = await import('@/utils/crudUtils');
        return getUsers();
      }
      return [];
    }
  },

  // Récupérer un utilisateur par ID
  getUser: async (id: string): Promise<User | undefined> => {
    try {
      return await ApiService.get<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch user with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getUser } = await import('@/utils/crudUtils');
        return getUser(id);
      }
      return undefined;
    }
  },

  // Récupérer l'utilisateur actuellement connecté
  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await ApiService.get<User>(`${API_CONFIG.ENDPOINTS.AUTH}/me`);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getCurrentUser } = await import('@/utils/crudUtils');
        return getCurrentUser();
      }
      return null;
    }
  },

  // Définir l'utilisateur actuellement connecté
  setCurrentUser: async (userId: string | null): Promise<void> => {
    if (userId) {
      localStorage.setItem('currentUserId', userId);
    } else {
      localStorage.removeItem('currentUserId');
    }
  },

  // Créer un nouvel utilisateur
  createUser: async (user: Omit<User, "id" | "createdAt">): Promise<User> => {
    try {
      return await ApiService.post<User>(`${API_CONFIG.ENDPOINTS.AUTH}/register`, user);
    } catch (error) {
      console.error('Failed to create user:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createUser } = await import('@/utils/crudUtils');
        return createUser(user);
      }
      throw error;
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (id: string, updatedUser: Partial<User>): Promise<User | undefined> => {
    try {
      return await ApiService.put<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, updatedUser);
    } catch (error) {
      console.error(`Failed to update user with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { updateUser } = await import('@/utils/crudUtils');
        return updateUser(id, updatedUser);
      }
      return undefined;
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (id: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete user with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteUser } = await import('@/utils/crudUtils');
        return deleteUser(id);
      }
      return false;
    }
  },

  // Connecter un utilisateur
  login: async (email: string, password: string): Promise<{user: User, token: string}> => {
    try {
      const response = await ApiService.post<{user: User, token: string}>(
        `${API_CONFIG.ENDPOINTS.AUTH}/login`, 
        { email, password }
      );
      
      // Stocker le token dans le localStorage
      localStorage.setItem('auth_token', response.token);
      
      // Définir l'utilisateur courant
      UserService.setCurrentUser(response.user.id);
      
      return response;
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  },

  // Déconnecter un utilisateur
  logout: async (): Promise<void> => {
    try {
      await ApiService.post<void>(`${API_CONFIG.ENDPOINTS.AUTH}/logout`, {});
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      // Toujours supprimer le token et l'utilisateur courant
      localStorage.removeItem('auth_token');
      UserService.setCurrentUser(null);
    }
  }
};

export default UserService;
