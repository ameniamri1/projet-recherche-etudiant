
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

  // Créer une nouvelle ressource
  createResource: async (resource: Omit<Resource, "id" | "createdAt">, file?: File): Promise<Resource> => {
    try {
      if (file) {
        // Créer un FormData pour l'upload du fichier
        const formData = new FormData();
        formData.append('file', file);
        Object.entries(resource).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
        
        // Configurer le client axios pour l'upload
        const response = await ApiService.post<Resource>(
          `${API_CONFIG.ENDPOINTS.TOPICS}/${resource.topicId}/resources`, 
          formData
        );
        return response;
      } else {
        // Juste créer une ressource avec une URL externe
        return await ApiService.post<Resource>(
          `${API_CONFIG.ENDPOINTS.TOPICS}/${resource.topicId}/resources`, 
          resource
        );
      }
    } catch (error) {
      console.error('Failed to create resource:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createResource } = await import('@/utils/crudUtils');
        return createResource(resource);
      }
      throw error;
    }
  },

  // Supprimer une ressource
  deleteResource: async (id: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.RESOURCES}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete resource with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteResource } = await import('@/utils/crudUtils');
        return deleteResource(id);
      }
      return false;
    }
  },

  // Télécharger une ressource
  downloadResource: async (id: string): Promise<Blob> => {
    try {
      const response = await ApiService.getWithBlob(`${API_CONFIG.ENDPOINTS.RESOURCES}/${id}/download`);
      return response;
    } catch (error) {
      console.error(`Failed to download resource with id ${id}:`, error);
      throw error;
    }
  }
};

export default ResourceService;
