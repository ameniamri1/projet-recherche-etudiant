
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicsList from "@/components/topics/TopicsList";
import ApplicationsList from "@/components/applications/ApplicationsList";
import CreateTopicDialog from "@/components/topics/CreateTopicDialog";
import { getTopics, getApplications } from "@/utils/crudUtils";
import { LayoutDashboard, Plus, Users, BookOpen, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Topic, Application } from "@/types/types";

const TeacherDashboardPage = () => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [acceptedStudents, setAcceptedStudents] = useState<number>(0);

  useEffect(() => {
    // Load data from local storage
    const loadedTopics = getTopics();
    const loadedApplications = getApplications();
    const accepted = loadedApplications.filter(app => app.status === "Accepted").length;
    
    setTopics(loadedTopics);
    setApplications(loadedApplications);
    setAcceptedStudents(accepted);
  }, []);

  // Refresh data when dialog closes (in case a new topic was added)
  const handleDialogClose = (isOpen: boolean) => {
    setIsCreateTopicOpen(isOpen);
    if (!isOpen) {
      setTopics(getTopics());
      setApplications(getApplications());
    }
  };

  const dashboardStats = [
    { label: "Sujets Actifs", value: topics.length, icon: BookOpen, color: "bg-blue-500" },
    { label: "Candidatures en attente", value: applications.filter(a => a.status === "Pending").length, icon: CheckSquare, color: "bg-amber-500" },
    { label: "Étudiants acceptés", value: acceptedStudents, icon: Users, color: "bg-green-500" }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Tableau de bord Enseignant</h1>
          </div>
          <Button 
            onClick={() => setIsCreateTopicOpen(true)} 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Créer un nouveau sujet
          </Button>
        </motion.div>

        {/* Statistiques du tableau de bord */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {dashboardStats.map((stat, index) => (
            <Card key={stat.label} className="bg-white border-none shadow-md overflow-hidden">
              <div className="flex items-center p-5">
                <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs defaultValue="topics" className="w-full">
            <TabsList className="mb-6 bg-white border border-gray-200 p-1 shadow-sm">
              <TabsTrigger value="topics" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                <BookOpen className="h-4 w-4 mr-2" /> Mes Sujets
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                <CheckSquare className="h-4 w-4 mr-2" /> Candidatures
              </TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                <Users className="h-4 w-4 mr-2" /> Étudiants acceptés
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="topics" className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <TopicsList topics={topics} isTeacherView={true} />
            </TabsContent>
            
            <TabsContent value="applications" className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <ApplicationsList applications={applications} />
            </TabsContent>
            
            <TabsContent value="students" className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              {acceptedStudents > 0 ? (
                <div className="grid gap-4">
                  {applications
                    .filter(app => app.status === "Accepted")
                    .map(app => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium">{app.studentName}</h3>
                          <p className="text-sm text-gray-500">Sujet: {app.topicTitle}</p>
                        </div>
                        <Button variant="outline" asChild>
                          <Link to={`/progress/${app.topicId}`}>Voir progression</Link>
                        </Button>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-lg font-medium">Aucun étudiant accepté pour l'instant</p>
                  <p className="text-sm">Les étudiants que vous acceptez apparaîtront ici</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        <CreateTopicDialog isOpen={isCreateTopicOpen} setIsOpen={handleDialogClose} />
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
