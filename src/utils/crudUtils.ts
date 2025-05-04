
import { Topic, Application, User } from "@/types/types";
import { mockedTopics, mockedApplications, mockedUsers } from "@/data/mockedData";

// Local storage keys
const TOPICS_KEY = "enicarthage_topics";
const APPLICATIONS_KEY = "enicarthage_applications";
const USERS_KEY = "enicarthage_users";

// Initialize local storage with mocked data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem(TOPICS_KEY)) {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(mockedTopics));
  }
  
  if (!localStorage.getItem(APPLICATIONS_KEY)) {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(mockedApplications));
  }
  
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockedUsers));
  }
};

// Topic CRUD Operations
export const getTopics = (): Topic[] => {
  initializeLocalStorage();
  const topics = localStorage.getItem(TOPICS_KEY);
  return topics ? JSON.parse(topics) : [];
};

export const getTopic = (id: string): Topic | undefined => {
  const topics = getTopics();
  return topics.find(topic => topic.id === id);
};

export const createTopic = (topic: Omit<Topic, "id" | "createdAt" | "applications">): Topic => {
  const topics = getTopics();
  const newTopic: Topic = {
    ...topic,
    id: (topics.length + 1).toString(),
    createdAt: new Date().toISOString(),
    applications: 0
  };
  
  topics.push(newTopic);
  localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  return newTopic;
};

export const updateTopic = (id: string, updatedTopic: Partial<Topic>): Topic | undefined => {
  const topics = getTopics();
  const topicIndex = topics.findIndex(topic => topic.id === id);
  
  if (topicIndex !== -1) {
    topics[topicIndex] = { ...topics[topicIndex], ...updatedTopic };
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
    return topics[topicIndex];
  }
  
  return undefined;
};

export const deleteTopic = (id: string): boolean => {
  const topics = getTopics();
  const filteredTopics = topics.filter(topic => topic.id !== id);
  
  if (filteredTopics.length < topics.length) {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(filteredTopics));
    return true;
  }
  
  return false;
};

// Application CRUD Operations
export const getApplications = (): Application[] => {
  initializeLocalStorage();
  const applications = localStorage.getItem(APPLICATIONS_KEY);
  return applications ? JSON.parse(applications) : [];
};

export const getApplicationsByTopic = (topicId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.topicId === topicId);
};

export const getApplicationsByStudent = (studentId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.studentId === studentId);
};

export const createApplication = (application: Omit<Application, "id" | "appliedAt" | "status">): Application => {
  const applications = getApplications();
  const newApplication: Application = {
    ...application,
    id: (applications.length + 1).toString(),
    appliedAt: new Date().toISOString(),
    status: "Pending"
  };
  
  // Update the applications count for the topic
  const topics = getTopics();
  const topicIndex = topics.findIndex(topic => topic.id === application.topicId);
  if (topicIndex !== -1) {
    topics[topicIndex].applications = (topics[topicIndex].applications || 0) + 1;
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  }
  
  applications.push(newApplication);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  return newApplication;
};

export const updateApplication = (id: string, updatedApplication: Partial<Application>): Application | undefined => {
  const applications = getApplications();
  const applicationIndex = applications.findIndex(app => app.id === id);
  
  if (applicationIndex !== -1) {
    applications[applicationIndex] = { ...applications[applicationIndex], ...updatedApplication };
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    return applications[applicationIndex];
  }
  
  return undefined;
};

export const deleteApplication = (id: string): boolean => {
  const applications = getApplications();
  const applicationToDelete = applications.find(app => app.id === id);
  
  if (!applicationToDelete) return false;
  
  const filteredApplications = applications.filter(app => app.id !== id);
  
  if (filteredApplications.length < applications.length) {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filteredApplications));
    
    // Update the applications count for the topic
    const topics = getTopics();
    const topicIndex = topics.findIndex(topic => topic.id === applicationToDelete.topicId);
    if (topicIndex !== -1 && topics[topicIndex].applications && topics[topicIndex].applications > 0) {
      topics[topicIndex].applications = topics[topicIndex].applications! - 1;
      localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
    }
    
    return true;
  }
  
  return false;
};

// User CRUD Operations
export const getUsers = (): User[] => {
  initializeLocalStorage();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getUser = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem("currentUserId");
  if (!userId) return null;
  
  return getUser(userId) || null;
};

export const setCurrentUser = (userId: string | null) => {
  if (userId) {
    localStorage.setItem("currentUserId", userId);
  } else {
    localStorage.removeItem("currentUserId");
  }
};

export const createUser = (user: Omit<User, "id" | "createdAt">): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: (users.length + 1).toString(),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const updateUser = (id: string, updatedUser: Partial<User>): User | undefined => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users[userIndex];
  }
  
  return undefined;
};

export const deleteUser = (id: string): boolean => {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length < users.length) {
    localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
    return true;
  }
  
  return false;
};
