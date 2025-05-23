
// Types adaptés aux entités du backend Spring Boot

export interface Topic {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  category: string;
  prerequisites?: string;
  deadline: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
  applicationCount: number;
}

export interface Application {
  id: string;
  topicId: string;
  topicTitle: string;
  studentId: string;
  studentName: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  appliedAt: string;
  responseDate?: string;
  teacherFeedback?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";
}

export interface Discussion {
  id: string;
  topicId: string;
  userId: string;
  userName: string;
  userRole: string;
  message: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  topicId: string;
  name: string;
  fileType: string;
  fileSize: number;
  uploadedById: string;
  uploadedByName: string;
  uploadedAt: string;
}

export interface Progress {
  id: string;
  topicId: string;
  topicTitle: string;
  studentId: string;
  studentName: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completionPercentage: number;
  notes?: string;
  lastUpdated: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";
}

export interface TopicRequest {
  title: string;
  description: string;
  category?: string;
  prerequisites?: string;
  deadline: string;
  contact?: string;
}

export interface ApplicationRequest {
  topicId: string;
  message: string;
}

export interface ApplicationStatusUpdateRequest {
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  feedback?: string;
}

export interface ProgressRequest {
  studentId: string;
  topicId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completionPercentage: number;
  notes?: string;
}

export interface DiscussionRequest {
  message: string;
}

// Types pour les messages avec des participants tunisiens
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
  role: "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";
}

export interface Conversation {
  id: string;
  participants: Participant[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  topicId: string;
  topicTitle: string;
}

export interface MessageRequest {
  text: string;
}

export interface ConversationRequest {
  topicId: string;
  teacherId: string;
}

// Liste des noms tunisiens pour les utilisateurs (à utiliser dans les services)
export const tunisianNames = [
  "Ahmed Ben Ali", "Fatma Trabelsi", "Youssef Bouzidi", "Leila Khelifi", 
  "Mohamed Sfaxi", "Amal Lahmar", "Karim Touati", "Sana Mejri",
  "Nabil Jendoubi", "Hela Bouazizi", "Tarek Hamdi", "Amina Chahed",
  "Hichem Jelassi", "Rania Oueslati", "Bilel Gharbi", "Salma Jabeur",
  "Omar Belhadj", "Ines Haddad", "Slim Yacoubi", "Nour Belhaj",
  "Zied Maaloul", "Mariem Ayari", "Jamel Mansouri", "Dorra Kallel"
];
