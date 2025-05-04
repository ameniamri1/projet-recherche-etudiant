
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
  applications?: number;
}

export interface Application {
  id: string;
  topicId: string;
  topicTitle: string;
  studentId: string;
  studentName: string;
  message: string;
  status: "Pending" | "Accepted" | "Declined";
  appliedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  createdAt: string;
}

export interface Discussion {
  id: string;
  topicId: string;
  userId: string;
  userName: string;
  userRole: "student" | "teacher";
  message: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  topicId: string;
  name: string;
  url: string;
  type: string;
  uploadedBy: string;
  createdAt: string;
}

export interface Progress {
  id: string;
  topicId: string;
  studentId: string;
  status: "Not Started" | "In Progress" | "Completed";
  completionPercentage: number;
  notes?: string;
  lastUpdated: string;
}
