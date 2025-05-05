
import { Topic } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les opérations CRUD sur les sujets de recherche
export const TopicService = {
  // Récupérer tous les sujets
  getTopics: async (filters?: any): Promise<Topic[]> => {
    try {
      return await ApiService.get<Topic[]>(API_CONFIG.ENDPOINTS.TOPICS, filters);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        // Récupérer les données du localStorage
        const localTopics = localStorage.getItem('enicarthage_topics');
        return localTopics ? JSON.parse(localTopics) : [];
      }
      return [];
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
  createTopic: async (topic: Omit<Topic, "id" | "createdAt" | "applications">): Promise<Topic> => {
    try {
      return await ApiService.post<Topic>(API_CONFIG.ENDPOINTS.TOPICS, topic);
    } catch (error) {
      console.error('Failed to create topic:', error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { createTopic } = await import('@/utils/crudUtils');
        return createTopic(topic);
      }
      throw error;
    }
  },

  // Mettre à jour un sujet
  updateTopic: async (id: string, updatedTopic: Partial<Topic>): Promise<Topic | undefined> => {
    try {
      return await ApiService.put<Topic>(`${API_CONFIG.ENDPOINTS.TOPICS}/${id}`, updatedTopic);
    } catch (error) {
      console.error(`Failed to update topic with id ${id}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { updateTopic } = await import('@/utils/crudUtils');
        return updateTopic(id, updatedTopic);
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
      return await ApiService.get<Topic[]>(`${API_CONFIG.ENDPOINTS.TOPICS}/teacher/${teacherId}`);
    } catch (error) {
      console.error(`Failed to fetch topics for teacher ${teacherId}:`, error);
      // Fallback aux données mockées en mode développement
      if (import.meta.env.MODE === 'development') {
        const { getTopics } = await import('@/utils/crudUtils');
        return getTopics().filter(topic => topic.teacherId === teacherId);
      }
      return [];
    }
  }
};

export default TopicService;
