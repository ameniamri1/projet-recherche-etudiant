
import { Progress } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur le suivi de progression
export const ProgressService = {
  // Récupérer le suivi de progression par sujet
  getProgressByTopic: async (topicId: string): Promise<Progress[]> => {
    try {
      return await ApiService.get<Progress[]>(`${API_CONFIG.ENDPOINTS.PROGRESS}/topic/${topicId}`);
    } catch (error) {
      console.error(`Failed to fetch progress for topic ${topicId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getProgressByTopic } = await import('@/utils/crudUtils');
        return getProgressByTopic(topicId);
      }
      return [];
    }
  },

  // Récupérer le suivi de progression par étudiant
  getProgressByStudent: async (studentId: string): Promise<Progress[]> => {
    try {
      return await ApiService.get<Progress[]>(`${API_CONFIG.ENDPOINTS.PROGRESS}/student/${studentId}`);
    } catch (error) {
      console.error(`Failed to fetch progress for student ${studentId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getProgressByStudent } = await import('@/utils/crudUtils');
        return getProgressByStudent(studentId);
      }
      return [];
    }
  },

  // Créer un nouveau suivi de progression
  createProgress: async (progress: Omit<Progress, "id" | "lastUpdated">): Promise<Progress> => {
    try {
      return await ApiService.post<Progress>(API_CONFIG.ENDPOINTS.PROGRESS, progress);
    } catch (error) {
      console.error('Failed to create progress:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createProgress } = await import('@/utils/crudUtils');
        return createProgress(progress);
      }
      throw error;
    }
  },

  // Mettre à jour un suivi de progression
  updateProgress: async (id: string, updatedProgress: Partial<Progress>): Promise<Progress | undefined> => {
    try {
      return await ApiService.put<Progress>(`${API_CONFIG.ENDPOINTS.PROGRESS}/${id}`, updatedProgress);
    } catch (error) {
      console.error(`Failed to update progress with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { updateProgress } = await import('@/utils/crudUtils');
        return updateProgress(id, updatedProgress);
      }
      return undefined;
    }
  }
};

export default ProgressService;
