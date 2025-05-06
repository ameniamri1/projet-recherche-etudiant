
import { Topic, Application, User, Discussion, Resource, Progress } from "@/types/types";
import { mockedTopics, mockedApplications, mockedUsers } from "@/data/mockedData";

// Fonctions pour simuler des opérations CRUD en mode développement

// Topics
export const getTopics = (): Topic[] => {
  const storedTopics = localStorage.getItem('enicarthage_topics');
  return storedTopics ? JSON.parse(storedTopics) : mockedTopics;
};

export const getTopic = (id: string): Topic | undefined => {
  const topics = getTopics();
  return topics.find(topic => topic.id === id);
};

export const createTopic = (topic: Omit<Topic, "id" | "createdAt" | "updatedAt" | "applicationCount">): Topic => {
  const topics = getTopics();
  const newTopic: Topic = {
    id: `t${Date.now()}`,
    ...topic,
    applicationCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const updatedTopics = [...topics, newTopic];
  localStorage.setItem('enicarthage_topics', JSON.stringify(updatedTopics));
  return newTopic;
};

export const updateTopic = (id: string, updatedTopic: Partial<Topic>): Topic | undefined => {
  const topics = getTopics();
  const topicIndex = topics.findIndex(topic => topic.id === id);
  
  if (topicIndex === -1) return undefined;
  
  const topic = topics[topicIndex];
  const newTopic = { 
    ...topic, 
    ...updatedTopic,
    updatedAt: new Date().toISOString()
  };
  
  topics[topicIndex] = newTopic;
  localStorage.setItem('enicarthage_topics', JSON.stringify(topics));
  return newTopic;
};

export const deleteTopic = (id: string): boolean => {
  const topics = getTopics();
  const filteredTopics = topics.filter(topic => topic.id !== id);
  
  if (filteredTopics.length === topics.length) return false;
  
  localStorage.setItem('enicarthage_topics', JSON.stringify(filteredTopics));
  return true;
};

// Applications
export const getApplications = (): Application[] => {
  const storedApplications = localStorage.getItem('enicarthage_applications');
  return storedApplications ? JSON.parse(storedApplications) : mockedApplications;
};

export const getApplicationsByTopic = (topicId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.topicId === topicId);
};

export const getApplicationsByStudent = (studentId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.studentId === studentId);
};

export const createApplication = (application: Omit<Application, "id" | "status" | "appliedAt">): Application => {
  const applications = getApplications();
  
  // Incrémenter le nombre d'applications pour ce sujet
  const topics = getTopics();
  const topicIndex = topics.findIndex(t => t.id === application.topicId);
  
  if (topicIndex >= 0) {
    topics[topicIndex] = {
      ...topics[topicIndex],
      applicationCount: topics[topicIndex].applicationCount + 1
    };
    localStorage.setItem('enicarthage_topics', JSON.stringify(topics));
  }
  
  const newApplication: Application = {
    id: `a${Date.now()}`,
    ...application,
    status: "PENDING",
    appliedAt: new Date().toISOString()
  };
  
  const updatedApplications = [...applications, newApplication];
  localStorage.setItem('enicarthage_applications', JSON.stringify(updatedApplications));
  return newApplication;
};

export const updateApplication = (id: string, updatedData: Partial<Application>): Application | undefined => {
  const applications = getApplications();
  const applicationIndex = applications.findIndex(app => app.id === id);
  
  if (applicationIndex === -1) return undefined;
  
  const application = applications[applicationIndex];
  const newApplication = { 
    ...application, 
    ...updatedData,
  };
  
  applications[applicationIndex] = newApplication;
  localStorage.setItem('enicarthage_applications', JSON.stringify(applications));
  return newApplication;
};

export const deleteApplication = (id: string): boolean => {
  const applications = getApplications();
  const filteredApplications = applications.filter(app => app.id !== id);
  
  if (filteredApplications.length === applications.length) return false;
  
  localStorage.setItem('enicarthage_applications', JSON.stringify(filteredApplications));
  return true;
};

// Users
export const getUsers = (): User[] => {
  const storedUsers = localStorage.getItem('enicarthage_users');
  return storedUsers ? JSON.parse(storedUsers) : mockedUsers;
};

export const getUser = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getCurrentUser = (): User | undefined => {
  // Simuler un utilisateur connecté (étudiant par défaut)
  return {
    id: "s1",
    name: "Alex Thompson",
    email: "alex.t@university.edu",
    role: "ROLE_STUDENT"
  };
};

// Autres opérations CRUD pour Discussions, Resources, Progress, etc.
export const getDiscussions = (topicId: string): Discussion[] => {
  const storedDiscussions = localStorage.getItem(`enicarthage_discussions_${topicId}`);
  return storedDiscussions ? JSON.parse(storedDiscussions) : [];
};

export const createDiscussion = (discussion: Omit<Discussion, "id" | "createdAt">): Discussion => {
  const topicId = discussion.topicId;
  const discussions = getDiscussions(topicId);
  
  const newDiscussion: Discussion = {
    id: `d${Date.now()}`,
    ...discussion,
    createdAt: new Date().toISOString()
  };
  
  const updatedDiscussions = [...discussions, newDiscussion];
  localStorage.setItem(`enicarthage_discussions_${topicId}`, JSON.stringify(updatedDiscussions));
  return newDiscussion;
};

export const deleteDiscussion = (id: string): boolean => {
  // Cette implémentation est simplifiée car nous n'avons pas de moyen facile de savoir
  // à quel topicId appartient la discussion sans la parcourir
  const allKeys = Object.keys(localStorage);
  const discussionKeys = allKeys.filter(key => key.startsWith('enicarthage_discussions_'));
  
  for (const key of discussionKeys) {
    const discussions = JSON.parse(localStorage.getItem(key) || '[]');
    const filteredDiscussions = discussions.filter((d: Discussion) => d.id !== id);
    
    if (filteredDiscussions.length !== discussions.length) {
      localStorage.setItem(key, JSON.stringify(filteredDiscussions));
      return true;
    }
  }
  
  return false;
};

export const getResources = (topicId: string): Resource[] => {
  const storedResources = localStorage.getItem(`enicarthage_resources_${topicId}`);
  return storedResources ? JSON.parse(storedResources) : [];
};

export const deleteResource = (id: string): boolean => {
  // Même approche que pour les discussions
  const allKeys = Object.keys(localStorage);
  const resourceKeys = allKeys.filter(key => key.startsWith('enicarthage_resources_'));
  
  for (const key of resourceKeys) {
    const resources = JSON.parse(localStorage.getItem(key) || '[]');
    const filteredResources = resources.filter((r: Resource) => r.id !== id);
    
    if (filteredResources.length !== resources.length) {
      localStorage.setItem(key, JSON.stringify(filteredResources));
      return true;
    }
  }
  
  return false;
};

export const getProgressByTopic = (topicId: string): Progress[] => {
  const storedProgress = localStorage.getItem(`enicarthage_progress_${topicId}`);
  return storedProgress ? JSON.parse(storedProgress) : [];
};

export const getProgressByStudent = (studentId: string): Progress[] => {
  // Plutôt qu'une implémentation optimale, nous utilisons une approche simplifiée
  const allKeys = Object.keys(localStorage);
  const progressKeys = allKeys.filter(key => key.startsWith('enicarthage_progress_'));
  
  let allProgress: Progress[] = [];
  
  for (const key of progressKeys) {
    const progress = JSON.parse(localStorage.getItem(key) || '[]');
    allProgress = [...allProgress, ...progress];
  }
  
  return allProgress.filter(p => p.studentId === studentId);
};

export const createProgress = (progress: Omit<Progress, "id" | "lastUpdated">): Progress => {
  const topicId = progress.topicId;
  const progressRecords = getProgressByTopic(topicId);
  
  const newProgress: Progress = {
    id: `p${Date.now()}`,
    ...progress,
    lastUpdated: new Date().toISOString()
  };
  
  const updatedProgress = [...progressRecords, newProgress];
  localStorage.setItem(`enicarthage_progress_${topicId}`, JSON.stringify(updatedProgress));
  return newProgress;
};
