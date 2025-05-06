
import { API_CONFIG } from '@/config/api.config';
import ApiService from '@/utils/apiService';
import { Discussion, Message, Conversation } from '@/types/types';

export const MessageService = {
  // Récupérer toutes les conversations d'un utilisateur
  getConversations: async (): Promise<Conversation[]> => {
    try {
      return await ApiService.get<Conversation[]>(`${API_CONFIG.ENDPOINTS.USERS}/conversations`);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      // En mode développement, nous retournons des données mockées
      if (import.meta.env.MODE === 'development') {
        return getMockedConversations();
      }
      return [];
    }
  },

  // Récupérer les messages d'une conversation
  getMessages: async (conversationId: string): Promise<Message[]> => {
    try {
      return await ApiService.get<Message[]>(`${API_CONFIG.ENDPOINTS.USERS}/conversations/${conversationId}/messages`);
    } catch (error) {
      console.error(`Failed to fetch messages for conversation ${conversationId}:`, error);
      // En mode développement, nous retournons des données mockées
      if (import.meta.env.MODE === 'development') {
        return getMockedMessages(conversationId);
      }
      return [];
    }
  },

  // Envoyer un message
  sendMessage: async (conversationId: string, message: string): Promise<Message> => {
    try {
      return await ApiService.post<Message>(
        `${API_CONFIG.ENDPOINTS.USERS}/conversations/${conversationId}/messages`, 
        { text: message }
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      // En mode développement, nous retournons un message mocké
      if (import.meta.env.MODE === 'development') {
        return createMockedMessage(conversationId, message);
      }
      throw error;
    }
  },

  // Créer une nouvelle conversation avec un enseignant à propos d'un sujet
  createConversation: async (topicId: string, teacherId: string): Promise<Conversation> => {
    try {
      return await ApiService.post<Conversation>(
        `${API_CONFIG.ENDPOINTS.USERS}/conversations`, 
        { topicId, teacherId }
      );
    } catch (error) {
      console.error('Failed to create conversation:', error);
      // En mode développement, nous retournons une conversation mockée
      if (import.meta.env.MODE === 'development') {
        return createMockedConversation(topicId, teacherId);
      }
      throw error;
    }
  },
};

// Fonctions d'aide pour générer des données mockées (uniquement pour le développement)
function getMockedConversations(): Conversation[] {
  return [
    {
      id: "1",
      participants: [
        { id: "teacher1", name: "Prof. David Wilson", role: "ROLE_TEACHER" },
        { id: "student1", name: "Current User", role: "ROLE_STUDENT" }
      ],
      lastMessage: "Yes, you can submit your application by Friday.",
      lastMessageTime: new Date().toISOString(),
      unreadCount: 2,
      topicId: "topic1",
      topicTitle: "Machine Learning Algorithms for Predictive Analytics"
    },
    {
      id: "2",
      participants: [
        { id: "teacher2", name: "Dr. Sarah Johnson", role: "ROLE_TEACHER" },
        { id: "student1", name: "Current User", role: "ROLE_STUDENT" }
      ],
      lastMessage: "Please look at the updated guidelines for the database project.",
      lastMessageTime: new Date(Date.now() - 86400000).toISOString(), // yesterday
      unreadCount: 0,
      topicId: "topic2",
      topicTitle: "Database Design Principles"
    },
    {
      id: "3",
      participants: [
        { id: "teacher3", name: "Prof. Michael Brown", role: "ROLE_TEACHER" },
        { id: "student1", name: "Current User", role: "ROLE_STUDENT" }
      ],
      lastMessage: "The meeting is scheduled for tomorrow at 3 PM in Room 302.",
      lastMessageTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      unreadCount: 0,
      topicId: "topic3",
      topicTitle: "Psychology of Human-Computer Interaction"
    }
  ];
}

function getMockedMessages(conversationId: string): Message[] {
  switch(conversationId) {
    case "1":
      return [
        { id: "m1", conversationId: "1", senderId: "teacher1", text: "Hello, I saw your application for the research topic.", createdAt: new Date(Date.now() - 172800000).toISOString() },
        { id: "m2", conversationId: "1", senderId: "student1", text: "Yes, I'm very interested in working on machine learning algorithms.", createdAt: new Date(Date.now() - 172500000).toISOString() },
        { id: "m3", conversationId: "1", senderId: "teacher1", text: "Great! Could you tell me more about your previous experience with neural networks?", createdAt: new Date(Date.now() - 172200000).toISOString() },
        { id: "m4", conversationId: "1", senderId: "student1", text: "I've worked on several projects involving convolutional neural networks during my internship last summer.", createdAt: new Date(Date.now() - 171600000).toISOString() },
        { id: "m5", conversationId: "1", senderId: "teacher1", text: "That's excellent. Do you have any questions about the research topic?", createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: "m6", conversationId: "1", senderId: "student1", text: "Yes, I was wondering about the deadline for the application?", createdAt: new Date(Date.now() - 3600000).toISOString() },
        { id: "m7", conversationId: "1", senderId: "teacher1", text: "Yes, you can submit your application by Friday.", createdAt: new Date(Date.now() - 1800000).toISOString() },
      ];
    case "2":
      return [
        { id: "m1", conversationId: "2", senderId: "teacher2", text: "Hello, I'm Dr. Johnson, the supervisor for the database research project.", createdAt: new Date(Date.now() - 259200000).toISOString() },
        { id: "m2", conversationId: "2", senderId: "student1", text: "Hello Dr. Johnson, thank you for accepting my application.", createdAt: new Date(Date.now() - 258000000).toISOString() },
        { id: "m3", conversationId: "2", senderId: "teacher2", text: "You're welcome. I was impressed by your previous work with SQL databases.", createdAt: new Date(Date.now() - 257000000).toISOString() },
        { id: "m4", conversationId: "2", senderId: "teacher2", text: "Please look at the updated guidelines for the database project.", createdAt: new Date(Date.now() - 86400000).toISOString() },
      ];
    case "3":
      return [
        { id: "m1", conversationId: "3", senderId: "teacher3", text: "Hello, I'd like to schedule a meeting to discuss the psychology research project.", createdAt: new Date(Date.now() - 345600000).toISOString() },
        { id: "m2", conversationId: "3", senderId: "student1", text: "I'm available tomorrow afternoon.", createdAt: new Date(Date.now() - 345000000).toISOString() },
        { id: "m3", conversationId: "3", senderId: "teacher3", text: "Perfect. The meeting is scheduled for tomorrow at 3 PM in Room 302.", createdAt: new Date(Date.now() - 344000000).toISOString() },
      ];
    default:
      return [];
  }
}

function createMockedMessage(conversationId: string, text: string): Message {
  return {
    id: `new-${Date.now()}`,
    conversationId,
    senderId: "student1", // L'utilisateur actuel
    text,
    createdAt: new Date().toISOString()
  };
}

function createMockedConversation(topicId: string, teacherId: string): Conversation {
  return {
    id: `new-${Date.now()}`,
    participants: [
      { id: teacherId, name: "Teacher Name", role: "ROLE_TEACHER" },
      { id: "student1", name: "Current User", role: "ROLE_STUDENT" }
    ],
    lastMessage: "",
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    topicId,
    topicTitle: "New Conversation Topic"
  };
}

export default MessageService;
