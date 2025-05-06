import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, CheckCircle2, XCircle, MessageCircle, SendHorizontal, User, UserCheck, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockedTopics, mockedApplications } from "@/data/mockedData";
import { Topic, Application } from "@/types/types";

// Mock students with more data
const students = [
  {
    id: "student1",
    name: "John Doe",
    email: "john.doe@university.edu",
    major: "Computer Science",
    year: "3rd year",
    avatar: null,
  },
  {
    id: "student2",
    name: "Alice Smith",
    email: "alice.smith@university.edu",
    major: "Data Science",
    year: "2nd year",
    avatar: null,
  },
  {
    id: "student3",
    name: "Robert Johnson",
    email: "robert.johnson@university.edu",
    major: "Software Engineering",
    year: "4th year",
    avatar: null,
  }
];

const ManageCandidatesPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [messageText, setMessageText] = useState("");
  const [activeStudent, setActiveStudent] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load topic and applications data
  useEffect(() => {
    if (topicId) {
      const foundTopic = mockedTopics.find(t => t.id === topicId);
      if (foundTopic) {
        setTopic(foundTopic);
        const topicApplications = mockedApplications.filter(app => app.topicId === topicId);
        setApplications(topicApplications);
      }
    }
  }, [topicId]);

  const getStudentDetails = (studentId: string) => {
    return students.find(s => s.id === studentId) || null;
  };

  const handleAccept = (applicationId: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: "ACCEPTED" as const } 
          : app
      )
    );
    
    toast({
      title: "Application accepted",
      description: "The student has been notified",
    });
  };

  const handleDecline = (applicationId: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: "DECLINED" as const } 
          : app
      )
    );
    
    toast({
      title: "Application declined",
      description: "The student has been notified",
    });
  };

  const handleSendMessage = (studentId: string) => {
    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent",
      description: "Your message has been sent to the student",
    });

    setMessageText("");
  };

  const getFilteredApplications = () => {
    if (statusFilter === "all") return applications;
    return applications.filter(app => app.status.toLowerCase() === statusFilter.toUpperCase());
  };

  const filteredApplications = getFilteredApplications();

  if (!topic) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Topic not found</h2>
            <p className="text-gray-600 mb-6">The research topic you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/teacher-dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            asChild
          >
            <Link to="/teacher-dashboard" className="flex items-center text-indigo-600">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">{topic.title}</h1>
              <p className="text-gray-600">Manage student applications</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-100 text-indigo-800">{topic.category}</Badge>
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                Deadline: {new Date(topic.deadline).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {/* Sidebar with stats */}
          <div className="md:col-span-1">
            <Card className="bg-white shadow-sm border-gray-200 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Applications</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-700">Total</span>
                    </div>
                    <span className="font-medium">{applications.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-700">Accepted</span>
                    </div>
                    <span className="font-medium">
                      {applications.filter(a => a.status === "ACCEPTED").length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-amber-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm text-gray-700">Pending</span>
                    </div>
                    <span className="font-medium">
                      {applications.filter(a => a.status === "PENDING").length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-700">Declined</span>
                    </div>
                    <span className="font-medium">
                      {applications.filter(a => a.status === "DECLINED").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Filter</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Button 
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start mb-1"
                    onClick={() => setStatusFilter("all")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    All Applications
                  </Button>
                  
                  <Button 
                    variant={statusFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start mb-1"
                    onClick={() => setStatusFilter("pending")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                  
                  <Button 
                    variant={statusFilter === "accepted" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start mb-1"
                    onClick={() => setStatusFilter("accepted")}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Accepted
                  </Button>
                  
                  <Button 
                    variant={statusFilter === "declined" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter("declined")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Declined
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="applications" className="w-full">
              <TabsList className="mb-6 bg-white border border-gray-200 p-1 shadow-sm">
                <TabsTrigger 
                  value="applications" 
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger 
                  value="messaging" 
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  Messaging
                </TabsTrigger>
              </TabsList>
              
              {/* Applications list */}
              <TabsContent value="applications">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                    <User className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">No applications found</h3>
                    {statusFilter !== "all" ? (
                      <p className="text-gray-500 mt-1">
                        No {statusFilter} applications for this topic
                      </p>
                    ) : (
                      <p className="text-gray-500 mt-1">
                        No students have applied to this research topic yet
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplications.map((application) => {
                      const student = getStudentDetails(application.studentId);
                      return (
                        <Card key={application.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-100">
                              <div className="flex flex-col items-center text-center">
                                <Avatar className="h-16 w-16 mb-2">
                                  <AvatarImage src={student?.avatar || ""} alt={student?.name || ""} />
                                  <AvatarFallback className="bg-indigo-100 text-indigo-800">
                                    {student?.name.substring(0, 2).toUpperCase() || "ST"}
                                  </AvatarFallback>
                                </Avatar>
                                <h3 className="font-medium text-gray-800">{student?.name}</h3>
                                <p className="text-sm text-gray-500">{student?.email}</p>
                                <div className="mt-2 text-xs text-gray-500">
                                  <p>{student?.major}</p>
                                  <p>{student?.year}</p>
                                </div>
                                <div className="mt-3">
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
                              </div>
                            </div>
                            
                            <div className="w-full md:w-3/4 p-4">
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-800 mb-1">Application Message:</h4>
                                <p className="text-gray-600">{application.message}</p>
                              </div>
                              
                              <div className="mt-4 text-sm text-gray-500">
                                Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                              </div>
                              
                              {application.status === "PENDING" && (
                                <div className="mt-4 flex flex-wrap gap-2 justify-end">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="gap-1"
                                    onClick={() => setActiveStudent(application.studentId)}
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                    Message
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    className="gap-1"
                                    onClick={() => handleDecline(application.id)}
                                  >
                                    <XCircle className="h-4 w-4" />
                                    Decline
                                  </Button>
                                  <Button 
                                    size="sm"
                                    className="gap-1"
                                    onClick={() => handleAccept(application.id)}
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Accept
                                  </Button>
                                </div>
                              )}
                              
                              {application.status !== "PENDING" && (
                                <div className="mt-4 flex justify-end">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="gap-1"
                                    onClick={() => setActiveStudent(application.studentId)}
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                    Message Student
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
              
              {/* Messaging tab */}
              <TabsContent value="messaging">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Students list */}
                      <div className="md:col-span-1 border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b">
                          <h3 className="font-medium text-gray-800">Students</h3>
                        </div>
                        <div className="divide-y">
                          {applications.map((application) => {
                            const student = getStudentDetails(application.studentId);
                            return (
                              <div 
                                key={application.id}
                                className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${activeStudent === application.studentId ? 'bg-indigo-50' : ''}`}
                                onClick={() => setActiveStudent(application.studentId)}
                              >
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-indigo-100 text-indigo-800">
                                    {student?.name.substring(0, 2).toUpperCase() || "ST"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium text-gray-800">{student?.name}</h4>
                                  <p className="text-xs text-gray-500">{application.status}</p>
                                </div>
                              </div>
                            );
                          })}
                          
                          {applications.length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                              No students to message
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Message area */}
                      <div className="md:col-span-2 border rounded-lg overflow-hidden">
                        {activeStudent ? (
                          <>
                            <div className="bg-gray-50 p-3 border-b">
                              <h3 className="font-medium text-gray-800">
                                Message to {getStudentDetails(activeStudent)?.name}
                              </h3>
                            </div>
                            <div className="p-4">
                              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-600">
                                  This is the start of your conversation. All messages are private between you and the student.
                                </p>
                              </div>
                              
                              <div className="mt-auto">
                                <div className="relative">
                                  <Textarea
                                    placeholder="Type your message..."
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    className="pr-12 resize-none"
                                    rows={4}
                                  />
                                  <Button
                                    size="sm"
                                    className="absolute bottom-2 right-2"
                                    onClick={() => handleSendMessage(activeStudent)}
                                    disabled={!messageText.trim()}
                                  >
                                    <SendHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center p-8 text-center">
                            <div>
                              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                              <h3 className="text-lg font-medium text-gray-700">No conversation selected</h3>
                              <p className="text-gray-500 mt-1">
                                Select a student from the list to start messaging
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageCandidatesPage;
