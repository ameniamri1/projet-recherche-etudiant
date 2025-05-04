
import { Topic, Application, User, Discussion, Resource, Progress } from "@/types/types";
import { mockedTopics, mockedApplications, mockedUsers } from "@/data/mockedData";

// Local storage keys
const STORAGE_KEYS = {
  TOPICS: "enicarthage_topics",
  APPLICATIONS: "enicarthage_applications",
  USERS: "enicarthage_users",
  DISCUSSIONS: "enicarthage_discussions",
  RESOURCES: "enicarthage_resources",
  PROGRESS: "enicarthage_progress",
  CURRENT_USER: "currentUserId"
};

// Generic storage handler
const storage = {
  get: <T>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  set: <T>(key: string, data: T[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItem: <T>(key: string, id: string, idField: string = 'id'): T | undefined => {
    const items = storage.get<T>(key);
    return (items as any[]).find(item => item[idField] === id);
  },
  createItem: <T>(key: string, item: any, idField: string = 'id'): T => {
    const items = storage.get<T>(key);
    const newId = ((items as any[]).length + 1).toString();
    const timestamp = new Date().toISOString();
    
    const newItem = {
      ...item,
      [idField]: newId,
      createdAt: timestamp
    };
    
    (items as any[]).push(newItem);
    storage.set(key, items);
    return newItem as T;
  },
  updateItem: <T>(key: string, id: string, updates: Partial<T>, idField: string = 'id'): T | undefined => {
    const items = storage.get<T>(key);
    const index = (items as any[]).findIndex(item => item[idField] === id);
    
    if (index !== -1) {
      (items as any[])[index] = { ...(items as any[])[index], ...updates };
      storage.set(key, items);
      return (items as any[])[index];
    }
    
    return undefined;
  },
  deleteItem: <T>(key: string, id: string, idField: string = 'id'): boolean => {
    const items = storage.get<T>(key);
    const filteredItems = (items as any[]).filter(item => item[idField] !== id);
    
    if (filteredItems.length < items.length) {
      storage.set(key, filteredItems);
      return true;
    }
    
    return false;
  },
  filter: <T>(key: string, filterFn: (item: T) => boolean): T[] => {
    const items = storage.get<T>(key);
    return (items as any[]).filter(filterFn);
  }
};

// Initialize local storage with mocked data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.TOPICS)) {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(mockedTopics));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(mockedApplications));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockedUsers));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.DISCUSSIONS)) {
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify([]));
  }
};

// Topic CRUD Operations
export const getTopics = (): Topic[] => {
  initializeLocalStorage();
  return storage.get<Topic>(STORAGE_KEYS.TOPICS);
};

export const getTopic = (id: string): Topic | undefined => {
  initializeLocalStorage();
  return storage.getItem<Topic>(STORAGE_KEYS.TOPICS, id);
};

export const createTopic = (topic: Omit<Topic, "id" | "createdAt" | "applications">): Topic => {
  initializeLocalStorage();
  return storage.createItem<Topic>(STORAGE_KEYS.TOPICS, {
    ...topic,
    applications: 0
  });
};

export const updateTopic = (id: string, updatedTopic: Partial<Topic>): Topic | undefined => {
  return storage.updateItem<Topic>(STORAGE_KEYS.TOPICS, id, updatedTopic);
};

export const deleteTopic = (id: string): boolean => {
  // Delete all applications for this topic
  const applications = getApplicationsByTopic(id);
  applications.forEach(app => deleteApplication(app.id));
  
  return storage.deleteItem<Topic>(STORAGE_KEYS.TOPICS, id);
};

// Application CRUD Operations
export const getApplications = (): Application[] => {
  initializeLocalStorage();
  return storage.get<Application>(STORAGE_KEYS.APPLICATIONS);
};

export const getApplicationsByTopic = (topicId: string): Application[] => {
  return storage.filter<Application>(
    STORAGE_KEYS.APPLICATIONS, 
    app => app.topicId === topicId
  );
};

export const getApplicationsByStudent = (studentId: string): Application[] => {
  return storage.filter<Application>(
    STORAGE_KEYS.APPLICATIONS, 
    app => app.studentId === studentId
  );
};

export const createApplication = (application: Omit<Application, "id" | "appliedAt" | "status">): Application => {
  const newApplication = storage.createItem<Application>(STORAGE_KEYS.APPLICATIONS, {
    ...application,
    status: "Pending"
  }, 'id');
  
  // Update the applications count for the topic
  const topics = getTopics();
  const topicIndex = topics.findIndex(topic => topic.id === application.topicId);
  if (topicIndex !== -1) {
    topics[topicIndex].applications = (topics[topicIndex].applications || 0) + 1;
    storage.set(STORAGE_KEYS.TOPICS, topics);
  }
  
  return newApplication;
};

export const updateApplication = (id: string, updatedApplication: Partial<Application>): Application | undefined => {
  return storage.updateItem<Application>(STORAGE_KEYS.APPLICATIONS, id, updatedApplication);
};

export const deleteApplication = (id: string): boolean => {
  const application = storage.getItem<Application>(STORAGE_KEYS.APPLICATIONS, id);
  
  if (!application) return false;
  
  const result = storage.deleteItem<Application>(STORAGE_KEYS.APPLICATIONS, id);
  
  if (result) {
    // Update the applications count for the topic
    const topics = getTopics();
    const topicIndex = topics.findIndex(topic => topic.id === application.topicId);
    if (topicIndex !== -1 && topics[topicIndex].applications && topics[topicIndex].applications > 0) {
      topics[topicIndex].applications = topics[topicIndex].applications! - 1;
      storage.set(STORAGE_KEYS.TOPICS, topics);
    }
  }
  
  return result;
};

// User CRUD Operations
export const getUsers = (): User[] => {
  initializeLocalStorage();
  return storage.get<User>(STORAGE_KEYS.USERS);
};

export const getUser = (id: string): User | undefined => {
  initializeLocalStorage();
  return storage.getItem<User>(STORAGE_KEYS.USERS, id);
};

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userId) return null;
  
  return getUser(userId) || null;
};

export const setCurrentUser = (userId: string | null) => {
  if (userId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const createUser = (user: Omit<User, "id" | "createdAt">): User => {
  return storage.createItem<User>(STORAGE_KEYS.USERS, user);
};

export const updateUser = (id: string, updatedUser: Partial<User>): User | undefined => {
  return storage.updateItem<User>(STORAGE_KEYS.USERS, id, updatedUser);
};

export const deleteUser = (id: string): boolean => {
  return storage.deleteItem<User>(STORAGE_KEYS.USERS, id);
};

// Discussion CRUD Operations
export const getDiscussions = (topicId: string): Discussion[] => {
  initializeLocalStorage();
  return storage.filter<Discussion>(
    STORAGE_KEYS.DISCUSSIONS,
    discussion => discussion.topicId === topicId
  );
};

export const createDiscussion = (discussion: Omit<Discussion, "id" | "createdAt">): Discussion => {
  return storage.createItem<Discussion>(STORAGE_KEYS.DISCUSSIONS, discussion);
};

export const deleteDiscussion = (id: string): boolean => {
  return storage.deleteItem<Discussion>(STORAGE_KEYS.DISCUSSIONS, id);
};

// Resource CRUD Operations
export const getResources = (topicId: string): Resource[] => {
  initializeLocalStorage();
  return storage.filter<Resource>(
    STORAGE_KEYS.RESOURCES,
    resource => resource.topicId === topicId
  );
};

export const createResource = (resource: Omit<Resource, "id" | "createdAt">): Resource => {
  return storage.createItem<Resource>(STORAGE_KEYS.RESOURCES, resource);
};

export const deleteResource = (id: string): boolean => {
  return storage.deleteItem<Resource>(STORAGE_KEYS.RESOURCES, id);
};

// Progress CRUD Operations
export const getProgressByTopic = (topicId: string): Progress[] => {
  initializeLocalStorage();
  return storage.filter<Progress>(
    STORAGE_KEYS.PROGRESS,
    progress => progress.topicId === topicId
  );
};

export const getProgressByStudent = (studentId: string): Progress[] => {
  initializeLocalStorage();
  return storage.filter<Progress>(
    STORAGE_KEYS.PROGRESS,
    progress => progress.studentId === studentId
  );
};

export const createProgress = (progress: Omit<Progress, "id" | "lastUpdated">): Progress => {
  return storage.createItem<Progress>(STORAGE_KEYS.PROGRESS, progress);
};

export const updateProgress = (id: string, updatedProgress: Partial<Progress>): Progress | undefined => {
  // Ensure the lastUpdated field is set to now
  const now = new Date().toISOString();
  return storage.updateItem<Progress>(
    STORAGE_KEYS.PROGRESS, 
    id, 
    { ...updatedProgress, lastUpdated: now }
  );
};
