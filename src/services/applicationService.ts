
import { Application } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur les candidatures
export const ApplicationService = {
  // Récupérer toutes les candidatures
  getApplications: async (filters?: any): Promise<Application[]> => {
    try {
      return await ApiService.get<Application[]>(API_CONFIG.ENDPOINTS.APPLICATIONS, filters);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getApplications } = await import('@/utils/crudUtils');
        return getApplications();
      }
      return [];
    }
  },

  // Récupérer les candidatures pour un sujet spécifique
  getApplicationsByTopic: async (topicId: string): Promise<Application[]> => {
    try {
      return await ApiService.get<Application[]>(`${API_CONFIG.ENDPOINTS.APPLICATIONS}/topic/${topicId}`);
    } catch (error) {
      console.error(`Failed to fetch applications for topic ${topicId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getApplicationsByTopic } = await import('@/utils/crudUtils');
        return getApplicationsByTopic(topicId);
      }
      return [];
    }
  },

  // Récupérer les candidatures d'un étudiant spécifique
  getApplicationsByStudent: async (studentId: string): Promise<Application[]> => {
    try {
      return await ApiService.get<Application[]>(`${API_CONFIG.ENDPOINTS.APPLICATIONS}/student/${studentId}`);
    } catch (error) {
      console.error(`Failed to fetch applications for student ${studentId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getApplicationsByStudent } = await import('@/utils/crudUtils');
        return getApplicationsByStudent(studentId);
      }
      return [];
    }
  },

  // Créer une nouvelle candidature
  createApplication: async (application: Omit<Application, "id" | "appliedAt" | "status">): Promise<Application> => {
    try {
      return await ApiService.post<Application>(API_CONFIG.ENDPOINTS.APPLICATIONS, application);
    } catch (error) {
      console.error('Failed to create application:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createApplication } = await import('@/utils/crudUtils');
        return createApplication(application);
      }
      throw error;
    }
  },

  // Mettre à jour une candidature
  updateApplication: async (id: string, updatedApplication: Partial<Application>): Promise<Application | undefined> => {
    try {
      return await ApiService.put<Application>(`${API_CONFIG.ENDPOINTS.APPLICATIONS}/${id}`, updatedApplication);
    } catch (error) {
      console.error(`Failed to update application with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { updateApplication } = await import('@/utils/crudUtils');
        return updateApplication(id, updatedApplication);
      }
      return undefined;
    }
  },

  // Supprimer une candidature
  deleteApplication: async (id: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.APPLICATIONS}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete application with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteApplication } = await import('@/utils/crudUtils');
        return deleteApplication(id);
      }
      return false;
    }
  }
};

export default ApplicationService;
