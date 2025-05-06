
import { Discussion, DiscussionRequest } from '@/types/types';
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
  createDiscussion: async (topicId: string, discussion: DiscussionRequest): Promise<Discussion> => {
    try {
      return await ApiService.post<Discussion>(
        `${API_CONFIG.ENDPOINTS.TOPICS}/${topicId}/discussions`, 
        discussion
      );
    } catch (error) {
      console.error('Failed to create discussion:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createDiscussion } = await import('@/utils/crudUtils');
        // Dans la version réelle, userId, userName et userRole serait automatiquement ajoutés côté serveur
        return createDiscussion({
          topicId,
          message: discussion.message,
          userId: "current-user-id", 
          userName: "Current User", 
          userRole: "ROLE_STUDENT"
        } as any);
      }
      throw error;
    }
  },
  
  // Mettre à jour une discussion
  updateDiscussion: async (topicId: string, discussionId: string, updatedDiscussion: DiscussionRequest): Promise<Discussion> => {
    try {
      return await ApiService.put<Discussion>(
        `${API_CONFIG.ENDPOINTS.TOPICS}/${topicId}/discussions/${discussionId}`, 
        updatedDiscussion
      );
    } catch (error) {
      console.error(`Failed to update discussion with id ${discussionId}:`, error);
      throw error;
    }
  },

  // Supprimer une discussion
  deleteDiscussion: async (topicId: string, discussionId: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.TOPICS}/${topicId}/discussions/${discussionId}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete discussion with id ${discussionId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteDiscussion } = await import('@/utils/crudUtils');
        return deleteDiscussion(discussionId);
      }
      return false;
    }
  }
};

export default DiscussionService;
