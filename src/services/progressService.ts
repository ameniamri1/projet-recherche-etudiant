
import { Progress, ProgressRequest } from '@/types/types';
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

  // Créer ou mettre à jour un suivi de progression
  createOrUpdateProgress: async (progressData: ProgressRequest): Promise<Progress> => {
    try {
      return await ApiService.post<Progress>(API_CONFIG.ENDPOINTS.PROGRESS, progressData);
    } catch (error) {
      console.error('Failed to create/update progress:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createProgress } = await import('@/utils/crudUtils');
        return createProgress(progressData as any);
      }
      throw error;
    }
  },

  // Supprimer un suivi de progression
  deleteProgress: async (progressId: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.PROGRESS}/${progressId}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete progress with id ${progressId}:`, error);
      return false;
    }
  }
};

export default ProgressService;
