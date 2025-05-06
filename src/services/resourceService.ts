
import { Resource } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur les ressources
export const ResourceService = {
  // Récupérer les ressources pour un sujet spécifique
  getResources: async (topicId: string): Promise<Resource[]> => {
    try {
      return await ApiService.get<Resource[]>(`${API_CONFIG.ENDPOINTS.TOPICS}/${topicId}/resources`);
    } catch (error) {
      console.error(`Failed to fetch resources for topic ${topicId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getResources } = await import('@/utils/crudUtils');
        return getResources(topicId);
      }
      return [];
    }
  },

  // Télécharger une ressource
  downloadResource: async (resourceId: string): Promise<Blob> => {
    try {
      const response = await ApiService.getWithBlob(`${API_CONFIG.ENDPOINTS.RESOURCES}/${resourceId}`);
      return response;
    } catch (error) {
      console.error(`Failed to download resource with id ${resourceId}:`, error);
      throw error;
    }
  },

  // Téléverser une nouvelle ressource
  uploadResource: async (topicId: string, file: File): Promise<Resource> => {
    try {
      // Utiliser la méthode uploadFile d'ApiService
      const response = await ApiService.uploadFile<Resource>(
        `${API_CONFIG.ENDPOINTS.TOPICS}/${topicId}/resources`,
        file
      );
      return response;
    } catch (error) {
      console.error('Failed to upload resource:', error);
      throw error;
    }
  },

  // Supprimer une ressource
  deleteResource: async (resourceId: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.RESOURCES}/${resourceId}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete resource with id ${resourceId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteResource } = await import('@/utils/crudUtils');
        return deleteResource(resourceId);
      }
      return false;
    }
  }
};

export default ResourceService;
