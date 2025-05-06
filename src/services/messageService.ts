
import { Message, Conversation, MessageRequest, ConversationRequest, tunisianNames } from '@/types/types';
import ApiService from '@/utils/apiService';
import { API_CONFIG } from '@/config/api.config';

// Service pour gérer les messages et les conversations
export const MessageService = {
  // Récupérer toutes les conversations de l'utilisateur
  getConversations: async (): Promise<Conversation[]> => {
    try {
      return await ApiService.get<Conversation[]>(API_CONFIG.ENDPOINTS.CONVERSATIONS);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      
      // Données mockées pour le développement avec des noms tunisiens
      if (import.meta.env.MODE === 'development') {
        const startDate = new Date('2025-01-01');
        const now = new Date('2025-05-06'); // Date actuelle en 2025
        
        // Générer des dates entre janvier et mai 2025
        const getRandomDate = () => {
          const randomTime = startDate.getTime() + Math.random() * (now.getTime() - startDate.getTime());
          return new Date(randomTime).toISOString();
        };
        
        const mockConversations: Conversation[] = [
          {
            id: 'conv1',
            participants: [
              { id: 'student1', name: tunisianNames[10], role: 'ROLE_STUDENT' },
              { id: 'teacher1', name: tunisianNames[0], role: 'ROLE_TEACHER' }
            ],
            lastMessage: "J'ai des questions sur la méthodologie de recherche",
            lastMessageTime: getRandomDate(),
            unreadCount: 2,
            topicId: 'topic1',
            topicTitle: 'Intelligence Artificielle et Apprentissage Automatique'
          },
          {
            id: 'conv2',
            participants: [
              { id: 'student1', name: tunisianNames[10], role: 'ROLE_STUDENT' },
              { id: 'teacher2', name: tunisianNames[1], role: 'ROLE_TEACHER' }
            ],
            lastMessage: "Pouvez-vous m'aider avec les références bibliographiques?",
            lastMessageTime: getRandomDate(),
            unreadCount: 0,
            topicId: 'topic2',
            topicTitle: 'Sécurité des Systèmes Distribués'
          },
          {
            id: 'conv3',
            participants: [
              { id: 'student1', name: tunisianNames[10], role: 'ROLE_STUDENT' },
              { id: 'teacher3', name: tunisianNames[2], role: 'ROLE_TEACHER' }
            ],
            lastMessage: "Je viens de soumettre la première partie de mon travail",
            lastMessageTime: getRandomDate(),
            unreadCount: 1,
            topicId: 'topic3',
            topicTitle: 'Blockchain et Applications Décentralisées'
          },
          {
            id: 'conv4',
            participants: [
              { id: 'student1', name: tunisianNames[10], role: 'ROLE_STUDENT' },
              { id: 'teacher4', name: tunisianNames[3], role: 'ROLE_TEACHER' }
            ],
            lastMessage: "Merci pour vos conseils, je vais les appliquer",
            lastMessageTime: getRandomDate(),
            unreadCount: 0,
            topicId: 'topic4',
            topicTitle: 'Systèmes Embarqués pour IoT'
          }
        ];
        
        return mockConversations;
      }
      
      return [];
    }
  },

  // Récupérer les messages d'une conversation
  getMessages: async (conversationId: string): Promise<Message[]> => {
    try {
      return await ApiService.get<Message[]>(`${API_CONFIG.ENDPOINTS.CONVERSATIONS}/${conversationId}/messages`);
    } catch (error) {
      console.error(`Failed to fetch messages for conversation ${conversationId}:`, error);
      
      // Données mockées pour le développement
      if (import.meta.env.MODE === 'development') {
        const startDate = new Date('2025-04-01');
        const endDate = new Date('2025-05-06'); // Date actuelle en 2025
        
        // Générer des dates entre avril et mai 2025
        const getRandomDate = () => {
          const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
          return new Date(randomTime).toISOString();
        };
        
        // Identifiants d'utilisateurs selon la conversation
        let teacherId = '';
        if (conversationId === 'conv1') teacherId = 'teacher1';
        else if (conversationId === 'conv2') teacherId = 'teacher2';
        else if (conversationId === 'conv3') teacherId = 'teacher3';
        else teacherId = 'teacher4';
        
        const mockMessages: Message[] = [
          {
            id: `${conversationId}-msg1`,
            conversationId,
            senderId: 'student1',
            text: "Bonjour, j'ai quelques questions concernant le sujet de recherche.",
            createdAt: getRandomDate()
          },
          {
            id: `${conversationId}-msg2`,
            conversationId,
            senderId: teacherId,
            text: "Bonjour! Bien sûr, je serais ravi de vous aider. Quelles sont vos questions?",
            createdAt: getRandomDate()
          },
          {
            id: `${conversationId}-msg3`,
            conversationId,
            senderId: 'student1',
            text: "Je voudrais savoir quelles méthodologies sont les plus appropriées pour ce type de recherche?",
            createdAt: getRandomDate()
          },
          {
            id: `${conversationId}-msg4`,
            conversationId,
            senderId: teacherId,
            text: "Excellente question! Pour ce sujet spécifique, je recommande une approche mixte combinant l'analyse quantitative et qualitative. Avez-vous déjà consulté les articles que j'ai partagés?",
            createdAt: getRandomDate()
          },
          {
            id: `${conversationId}-msg5`,
            conversationId,
            senderId: 'student1',
            text: "Oui, j'ai lu la plupart des articles. Ils sont très utiles. J'aimerais discuter de certains points plus en détail lors de notre prochaine réunion.",
            createdAt: getRandomDate()
          }
        ];
        
        // Trier les messages par date
        return mockMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
      
      return [];
    }
  },

  // Envoyer un message
  sendMessage: async (conversationId: string, text: string): Promise<Message> => {
    const messageRequest: MessageRequest = { text };
    
    try {
      return await ApiService.post<Message>(`${API_CONFIG.ENDPOINTS.CONVERSATIONS}/${conversationId}/messages`, messageRequest);
    } catch (error) {
      console.error(`Failed to send message to conversation ${conversationId}:`, error);
      
      // Simuler l'envoi d'un message en mode développement
      if (import.meta.env.MODE === 'development') {
        const mockMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId,
          senderId: 'student1',
          text,
          createdAt: new Date().toISOString()
        };
        
        return mockMessage;
      }
      
      throw error;
    }
  },

  // Créer une nouvelle conversation
  createConversation: async (topicId: string, teacherId: string): Promise<Conversation> => {
    const conversationRequest: ConversationRequest = { topicId, teacherId };
    
    try {
      return await ApiService.post<Conversation>(API_CONFIG.ENDPOINTS.CONVERSATIONS, conversationRequest);
    } catch (error) {
      console.error('Failed to create conversation:', error);
      
      // Simuler la création d'une conversation en mode développement
      if (import.meta.env.MODE === 'development') {
        const mockConversation: Conversation = {
          id: `conv-${Date.now()}`,
          participants: [
            { id: 'student1', name: tunisianNames[10], role: 'ROLE_STUDENT' },
            { id: teacherId, name: tunisianNames[4], role: 'ROLE_TEACHER' }
          ],
          lastMessage: "",
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          topicId,
          topicTitle: 'Nouveau Sujet de Recherche'
        };
        
        return mockConversation;
      }
      
      throw error;
    }
  },

  // Marquer les messages comme lus
  markAsRead: async (conversationId: string): Promise<boolean> => {
    try {
      await ApiService.put<void>(`${API_CONFIG.ENDPOINTS.CONVERSATIONS}/${conversationId}/read`, {});
      return true;
    } catch (error) {
      console.error(`Failed to mark conversation ${conversationId} as read:`, error);
      
      // Simuler le succès en mode développement
      if (import.meta.env.MODE === 'development') {
        return true;
      }
      
      return false;
    }
  }
};

export default MessageService;
