
import { Topic, Application, User } from "@/types/types";

export const mockedTopics: Topic[] = [
  {
    id: "1",
    title: "Machine Learning for Medical Image Analysis",
    description: "This research aims to develop advanced machine learning algorithms for analyzing medical images to aid in early disease detection and diagnosis. The student will work with datasets of medical images and implement state-of-the-art deep learning models.",
    teacherId: "t1",
    teacherName: "Dr. Sarah Johnson",
    category: "Computer Science",
    prerequisites: "Python, Machine Learning basics",
    deadline: "2025-06-30",
    contact: "s.johnson@university.edu",
    createdAt: "2025-04-01",
    applications: 3
  },
  {
    id: "2",
    title: "Blockchain Applications in Supply Chain Management",
    description: "Exploring how blockchain technology can improve transparency and efficiency in supply chain management. This research will involve designing and implementing a prototype system using blockchain to track products throughout the supply chain.",
    teacherId: "t2",
    teacherName: "Prof. Michael Chen",
    category: "Computer Science",
    prerequisites: "Knowledge of blockchain, JavaScript",
    deadline: "2025-07-15",
    contact: "m.chen@university.edu",
    createdAt: "2025-04-05",
    applications: 1
  },
  {
    id: "3",
    title: "Climate Change Impact on Marine Ecosystems",
    description: "This study will investigate the effects of climate change on marine ecosystems, specifically focusing on coral reefs. The research involves analyzing current data and making predictions about future impacts.",
    teacherId: "t3",
    teacherName: "Dr. Emily Brooks",
    category: "Biology",
    prerequisites: "Basic knowledge of marine biology",
    deadline: "2025-08-01",
    contact: "e.brooks@university.edu",
    createdAt: "2025-04-10",
    applications: 2
  },
  {
    id: "4",
    title: "Virtual Reality for Anxiety Disorders Treatment",
    description: "Research on using virtual reality technology to develop therapeutic interventions for patients with anxiety disorders. The project will involve designing VR environments and conducting user studies.",
    teacherId: "t4",
    teacherName: "Prof. David Martinez",
    category: "Psychology",
    prerequisites: "Interest in VR, basic psychology knowledge",
    deadline: "2025-07-20",
    contact: "d.martinez@university.edu",
    createdAt: "2025-04-12",
    applications: 0
  },
];

export const mockedApplications: Application[] = [
  {
    id: "a1",
    topicId: "1",
    topicTitle: "Machine Learning for Medical Image Analysis",
    studentId: "s1",
    studentName: "Alex Thompson",
    message: "I'm very interested in this topic as I have experience with Python and have completed several machine learning projects. I'm eager to apply my skills to medical image analysis and contribute to healthcare advancements.",
    status: "Pending",
    appliedAt: "2025-04-14"
  },
  {
    id: "a2",
    topicId: "1",
    topicTitle: "Machine Learning for Medical Image Analysis",
    studentId: "s2",
    studentName: "Jamie Rodriguez",
    message: "I've been working on image recognition algorithms for the past year and am fascinated by the medical applications. I have experience with TensorFlow and PyTorch, which I believe will be valuable for this project.",
    status: "Accepted",
    appliedAt: "2025-04-13"
  },
  {
    id: "a3",
    topicId: "3",
    topicTitle: "Climate Change Impact on Marine Ecosystems",
    studentId: "s3",
    studentName: "Sam Wilson",
    message: "I'm passionate about environmental conservation and have been involved in several marine biology projects. I would love to contribute to this important research on climate change impacts.",
    status: "Declined",
    appliedAt: "2025-04-12"
  }
];

export const mockedUsers: User[] = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    email: "s.johnson@university.edu",
    role: "teacher",
    createdAt: "2025-01-15"
  },
  {
    id: "t2",
    name: "Prof. Michael Chen",
    email: "m.chen@university.edu",
    role: "teacher",
    createdAt: "2025-01-20"
  },
  {
    id: "s1",
    name: "Alex Thompson",
    email: "alex.t@university.edu",
    role: "student",
    createdAt: "2025-02-10"
  },
  {
    id: "s2",
    name: "Jamie Rodriguez",
    email: "j.rodriguez@university.edu",
    role: "student",
    createdAt: "2025-02-15"
  }
];
