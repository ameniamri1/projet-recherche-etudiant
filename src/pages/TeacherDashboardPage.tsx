import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCheck, Clock, User, Bell, MessageSquare, GraduationCap } from "lucide-react";
import { Topic } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { TopicService, UserService } from "@/services";
import CreateTopicDialog from "@/components/topics/CreateTopicDialog";

const TeacherDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("topics");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // Dans une vraie application, nous obtiendrions l'ID de l'enseignant à partir du service d'authentification
        const teacherId = "teacher1"; // ID factice de l'enseignant
        const teacherTopics = await TopicService.getTopicsByTeacher(teacherId);
        setTopics(teacherTopics);
      } catch (error) {
        console.error("Erreur lors du chargement des sujets:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les sujets",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [toast]);

  const handleTopicCreated = () => {
    // Recharger les sujets après la création d'un nouveau sujet
    fetchTopics();
  };

  const fetchTopics = async () => {
    try {
      // Dans une vraie application, nous obtiendrions l'ID de l'enseignant à partir du service d'authentification
      const teacherId = "teacher1"; // ID factice de l'enseignant
      const teacherTopics = await TopicService.getTopicsByTeacher(teacherId);
      setTopics(teacherTopics);
    } catch (error) {
      console.error("Erreur lors du chargement des sujets:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les sujets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Teacher Dashboard</h1>
          </div>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setIsOpen(true)}
          >
            Add New Topic
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-white border-none shadow-md overflow-hidden">
            <div className="flex items-center p-5">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Research Topics</p>
                <p className="text-2xl font-bold">{topics.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white border-none shadow-md overflow-hidden">
            <div className="flex items-center p-5">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <CheckCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Applications</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white border-none shadow-md overflow-hidden">
            <div className="flex items-center p-5">
              <div className="bg-amber-500 p-3 rounded-lg mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">In Progress</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white border-none shadow-md overflow-hidden">
            <div className="flex items-center p-5">
              <div className="bg-red-500 p-3 rounded-lg mr-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Notifications</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-white border border-gray-200 p-1 shadow-sm">
              <TabsTrigger 
                value="topics" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <BookOpen className="h-4 w-4 mr-2" /> My Topics
              </TabsTrigger>
              <TabsTrigger 
                value="applications" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <CheckCheck className="h-4 w-4 mr-2" /> Applications
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Messages
              </TabsTrigger>
            </TabsList>
            
            {/* Topics Tab */}
            <TabsContent 
              value="topics" 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
            >
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-2"></div>
                    <p className="text-gray-500">Loading topics...</p>
                  </div>
                ) : topics.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">No topics created yet</h3>
                    <p className="text-gray-500 mt-1">Add a new research topic to get started</p>
                    <Button onClick={() => setIsOpen(true)} className="mt-4">
                      Create Topic
                    </Button>
                  </div>
                ) : (
                  topics.map((topic) => (
                    <Card key={topic.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{topic.title}</CardTitle>
                            <CardDescription>
                              Created at: {new Date(topic.createdAt).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {topic.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700">Description:</h4>
                          <p className="text-gray-600 text-sm">{topic.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-sm font-semibold text-gray-700">Prerequisites:</h4>
                          <p className="text-gray-600 text-sm">{topic.prerequisites || "None"}</p>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between bg-gray-50 border-t border-gray-100">
                        <Button variant="outline" size="sm">
                          View Applications
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" /> Contact Students
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            {/* Applications Tab */}
            <TabsContent 
              value="applications" 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
            >
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                <CheckCheck className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-700">No applications yet</h3>
                <p className="text-gray-500 mt-1">Check back once students have applied to your topics</p>
              </div>
            </TabsContent>
            
            {/* Messages Tab */}
            <TabsContent 
              value="messages" 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
            >
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-700">No messages yet</h3>
                <p className="text-gray-500 mt-1">Messages from students will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Create Topic Dialog */}
      
        
          
            
              Add a new topic for students to apply to.
            
          
        
      
      <CreateTopicDialog
        open={isOpen}
        setOpen={setIsOpen}
        onTopicCreated={handleTopicCreated}
      />
    </div>
  );
};

export default TeacherDashboardPage;
