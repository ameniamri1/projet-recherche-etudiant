
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockedTopics } from "@/data/mockedData";
import { Calendar, User, Mail, Clock, ArrowLeft, Send, MessageSquare, FileText } from "lucide-react";
import { motion } from "framer-motion";

const TopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [applicationMessage, setApplicationMessage] = useState("");
  
  // Find the topic from our mock data based on the ID from URL parameters
  const topic = mockedTopics.find(t => t.id === id);
  
  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-red-200">
          <h2 className="text-2xl text-red-600 mb-4">Topic not found</h2>
          <p className="mb-6">The requested topic could not be found.</p>
          <Button asChild>
            <Link to="/topics">Return to Topics</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleApply = () => {
    if (!applicationMessage.trim()) {
      toast({
        title: "Error",
        description: "Please write a message to the teacher.",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Applying for topic:", topic.id, "with message:", applicationMessage);
    toast({
      title: "Application submitted",
      description: "Your application has been sent to the teacher.",
    });
    setApplicationMessage("");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/topics" className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Topics
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="shadow-md border-indigo-100 bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-indigo-800">{topic.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-1">
                      <User className="h-3 w-3" /> {topic.teacherName}
                    </CardDescription>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{topic.category}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-700">{topic.description}</p>
                </div>
                
                {topic.prerequisites && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Prerequisites</h3>
                    <p className="text-gray-700">{topic.prerequisites}</p>
                  </div>
                )}
                
                <Tabs defaultValue="discussions">
                  <TabsList className="bg-gray-50 border border-gray-200">
                    <TabsTrigger value="discussions" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                      <MessageSquare className="h-4 w-4 mr-1" /> Discussions
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                      <FileText className="h-4 w-4 mr-1" /> Resources
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="discussions" className="py-4">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-center">No discussions yet. Be the first to ask a question!</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="py-4">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-center">No additional resources available.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-md border-indigo-100 bg-white">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3"></div>
              <CardHeader>
                <CardTitle className="text-indigo-800">Apply for this Topic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Deadline: {new Date(topic.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Contact: {topic.contact}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Posted on: {new Date(topic.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <User className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Applications: {topic.applications || 0}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Teacher
                  </label>
                  <Textarea
                    placeholder="Explain why you're interested in this topic and what makes you a good candidate..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="mb-4 resize-none min-h-[120px]"
                  />
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleApply}>
                    <Send className="h-4 w-4 mr-2" /> Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
