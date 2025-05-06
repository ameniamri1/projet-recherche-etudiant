
// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083/api',
  ENDPOINTS: {
    TOPICS: '/topics',
    APPLICATIONS: '/applications',
    USERS: '/users',
    DISCUSSIONS: '/discussions',
    RESOURCES: '/resources',
    PROGRESS: '/progress',
    AUTH: '/auth',
    CONVERSATIONS: '/conversations'  // Ajout de l'endpoint pour les conversations
  },
  TIMEOUT: 8000, // 8 secondes
};
