
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

  // Mettre à jour un utilisateur
  updateUser: async (id: string, updatedUser: Partial<User>): Promise<User | undefined> => {
    try {
      return await ApiService.put<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, updatedUser);
    } catch (error) {
      console.error(`Failed to update user with id ${id}:`, error);
      // En mode développement, nous ne pouvons pas utiliser updateUser car il n'existe pas dans crudUtils
      // Retournons simplement l'utilisateur mis à jour pour simuler
      if (import.meta.env.MODE === 'development') {
        console.log('Development mode: simulating user update');
        return { ...updatedUser, id } as User;
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
      // En mode développement, nous ne pouvons pas utiliser deleteUser car il n'existe pas dans crudUtils
      // Retournons simplement true pour simuler la suppression
      if (import.meta.env.MODE === 'development') {
        console.log('Development mode: simulating user deletion');
        return true;
      }
      return false;
    }
  },

  // Récupérer tous les enseignants
  getTeachers: async (): Promise<User[]> => {
    try {
      return await ApiService.get<User[]>(`${API_CONFIG.ENDPOINTS.USERS}/teachers`);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
      return [];
    }
  },

  // Récupérer tous les étudiants
  getStudents: async (): Promise<User[]> => {
    try {
      return await ApiService.get<User[]>(`${API_CONFIG.ENDPOINTS.USERS}/students`);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      return [];
    }
  }
};

export default UserService;
