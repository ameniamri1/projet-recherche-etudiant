
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCheck, Clock, User, Bell, MessageSquare } from "lucide-react";
import { Application } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { ApplicationService, AuthService } from "@/services";

// Mock notifications - dans une vraie application, cela viendrait du backend
const notifications = [
  {
    id: "1",
    message: "Your application for 'Machine Learning Algorithms' has been accepted",
    date: "2023-04-12T10:30:00Z",
    read: false
  },
  {
    id: "2",
    message: "New research topic added in Computer Science",
    date: "2023-04-10T14:20:00Z",
    read: true
  },
  {
    id: "3",
    message: "Deadline approaching for 'Neural Networks' application",
    date: "2023-04-08T09:15:00Z",
    read: true
  }
];

const StudentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Dans une vraie application, nous obtiendrions l'ID de l'étudiant à partir du service d'authentification
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          const studentApplications = await ApplicationService.getApplicationsByStudent(currentUser.id);
          setApplications(studentApplications);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des candidatures:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos candidatures",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

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
            <User className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Student Dashboard</h1>
          </div>
          <Button 
            asChild
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Link to="/topics">Browse Topics</Link>
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
                <CheckCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Applications</p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white border-none shadow-md overflow-hidden">
            <div className="flex items-center p-5">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <CheckCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Accepted</p>
                <p className="text-2xl font-bold">
                  {applications.filter(app => app.status === "ACCEPTED").length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white border-none shadow-md overflow-hidden">
            <div className="flex items-center p-5">
              <div className="bg-amber-500 p-3 rounded-lg mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending</p>
                <p className="text-2xl font-bold">
                  {applications.filter(app => app.status === "PENDING").length}
                </p>
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
                <p className="text-2xl font-bold">
                  {notifications.filter(n => !n.read).length}
                </p>
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
                value="applications" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <CheckCheck className="h-4 w-4 mr-2" /> My Applications
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Messages
              </TabsTrigger>
            </TabsList>
            
            {/* Applications Tab */}
            <TabsContent 
              value="applications" 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
            >
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-2"></div>
                    <p className="text-gray-500">Chargement de vos candidatures...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">No applications yet</h3>
                    <p className="text-gray-500 mt-1">Start applying to research topics to see them here</p>
                    <Button asChild className="mt-4">
                      <Link to="/topics">Browse Topics</Link>
                    </Button>
                  </div>
                ) : (
                  applications.map((application) => (
                    <Card key={application.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {application.topicTitle}
                            </CardTitle>
                            <CardDescription>
                              Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge
                            className={
                              application.status === "ACCEPTED"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : application.status === "PENDING"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {application.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700">Your Message:</h4>
                          <p className="text-gray-600 text-sm">{application.message}</p>
                        </div>
                        {application.teacherFeedback && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700">Teacher Feedback:</h4>
                            <p className="text-gray-600 text-sm">{application.teacherFeedback}</p>
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="flex justify-between bg-gray-50 border-t border-gray-100">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/topic/${application.topicId}`}>View Topic</Link>
                        </Button>
                        
                        {application.status === "ACCEPTED" && (
                          <Button size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" /> Contact Teacher
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent 
              value="notifications" 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
            >
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-indigo-100'}`}>
                          <Bell className={`h-5 w-5 ${notification.read ? 'text-gray-500' : 'text-indigo-600'}`} />
                        </div>
                        <div>
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <Badge className="bg-indigo-100 text-indigo-800">New</Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                {notifications.length === 0 && (
                  <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
                    <p className="text-gray-500 mt-1">You'll be notified about application updates and new topics</p>
                  </div>
                )}
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
                <p className="text-gray-500 mt-1">Messages from teachers will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
