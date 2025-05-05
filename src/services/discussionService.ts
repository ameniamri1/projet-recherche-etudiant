
import { Discussion } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur les discussions
export const DiscussionService = {
  // Récupérer les discussions pour un sujet spécifique
  getDiscussions: async (topicId: string): Promise<Discussion[]> => {
    try {
      return await ApiService.get<Discussion[]>(`${API_CONFIG.ENDPOINTS.TOPICS}/${topicId}/discussions`);
    } catch (error) {
      console.error(`Failed to fetch discussions for topic ${topicId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getDiscussions } = await import('@/utils/crudUtils');
        return getDiscussions(topicId);
      }
      return [];
    }
  },

  // Créer une nouvelle discussion
  createDiscussion: async (discussion: Omit<Discussion, "id" | "createdAt">): Promise<Discussion> => {
    try {
      return await ApiService.post<Discussion>(
        `${API_CONFIG.ENDPOINTS.TOPICS}/${discussion.topicId}/discussions`, 
        discussion
      );
    } catch (error) {
      console.error('Failed to create discussion:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createDiscussion } = await import('@/utils/crudUtils');
        return createDiscussion(discussion);
      }
      throw error;
    }
  },

  // Supprimer une discussion
  deleteDiscussion: async (id: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.DISCUSSIONS}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete discussion with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteDiscussion } = await import('@/utils/crudUtils');
        return deleteDiscussion(id);
      }
      return false;
    }
  }
};

export default DiscussionService;
