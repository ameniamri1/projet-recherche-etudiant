
import { Topic, TopicRequest } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur les sujets de recherche
export const TopicService = {
  // Récupérer tous les sujets avec pagination et filtres optionnels
  getTopics: async (page: number = 0, size: number = 10, category?: string, keyword?: string): Promise<{content: Topic[], totalElements: number, totalPages: number}> => {
    try {
      const params: Record<string, any> = { page, size };
      if (category) params.category = category;
      if (keyword) params.keyword = keyword;
      
      return await ApiService.get<{content: Topic[], totalElements: number, totalPages: number}>(
        API_CONFIG.ENDPOINTS.TOPICS, 
        params
      );
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        // Récupérer les données du localStorage
        const localTopics = localStorage.getItem('enicarthage_topics');
        const topics = localTopics ? JSON.parse(localTopics) : [];
        return {
          content: topics,
          totalElements: topics.length,
          totalPages: 1
        };
      }
      return { content: [], totalElements: 0, totalPages: 0 };
    }
  },

  // Récupérer un sujet par ID
  getTopic: async (id: string): Promise<Topic | undefined> => {
    try {
      return await ApiService.get<Topic>(`${API_CONFIG.ENDPOINTS.TOPICS}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch topic with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getTopic } = await import('@/utils/crudUtils');
        return getTopic(id);
      }
      return undefined;
    }
  },

  // Créer un nouveau sujet
  createTopic: async (topic: TopicRequest): Promise<Topic> => {
    try {
      return await ApiService.post<Topic>(API_CONFIG.ENDPOINTS.TOPICS, topic);
    } catch (error) {
      console.error('Failed to create topic:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createTopic } = await import('@/utils/crudUtils');
        return createTopic(topic as any);
      }
      throw error;
    }
  },

  // Mettre à jour un sujet
  updateTopic: async (id: string, updatedTopic: Partial<TopicRequest>): Promise<Topic | undefined> => {
    try {
      return await ApiService.put<Topic>(`${API_CONFIG.ENDPOINTS.TOPICS}/${id}`, updatedTopic);
    } catch (error) {
      console.error(`Failed to update topic with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { updateTopic } = await import('@/utils/crudUtils');
        return updateTopic(id, updatedTopic as any);
      }
      return undefined;
    }
  },

  // Supprimer un sujet
  deleteTopic: async (id: string): Promise<boolean> => {
    try {
      await ApiService.delete<void>(`${API_CONFIG.ENDPOINTS.TOPICS}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete topic with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { deleteTopic } = await import('@/utils/crudUtils');
        return deleteTopic(id);
      }
      return false;
    }
  },

  // Récupérer les sujets d'un enseignant spécifique
  getTopicsByTeacher: async (teacherId: string): Promise<Topic[]> => {
    try {
      const response = await ApiService.get<{content: Topic[]}>(`${API_CONFIG.ENDPOINTS.TOPICS}/teacher/${teacherId}`);
      return response.content;
    } catch (error) {
      console.error(`Failed to fetch topics for teacher ${teacherId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getTopics } = await import('@/utils/crudUtils');
        return getTopics().filter(topic => topic.teacherId === teacherId);
      }
      return [];
    }
  },
  
  // Récupérer les sujets de l'enseignant actuel
  getMyTopics: async (): Promise<Topic[]> => {
    try {
      return await ApiService.get<Topic[]>(`${API_CONFIG.ENDPOINTS.TOPICS}/my-topics`);
    } catch (error) {
      console.error('Failed to fetch my topics:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getTopics } = await import('@/utils/crudUtils');
        return getTopics();
      }
      return [];
    }
  }
};

export default TopicService;
