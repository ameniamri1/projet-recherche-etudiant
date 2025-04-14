
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockedTopics } from "@/data/mockedData";
import { Calendar, User, Mail, Clock } from "lucide-react";

const TopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [applicationMessage, setApplicationMessage] = useState("");
  
  // Find the topic from our mock data based on the ID from URL parameters
  const topic = mockedTopics.find(t => t.id === id);
  
  if (!topic) {
    return <div className="container mx-auto px-4 py-8 text-center">Topic not found</div>;
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/topics" className="text-indigo-600 hover:underline flex items-center">
            ← Back to Topics
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{topic.title}</CardTitle>
                    <CardDescription className="mt-1">
                      By {topic.teacherName}
                    </CardDescription>
                  </div>
                  <Badge>{topic.category}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{topic.description}</p>
                </div>
                
                {topic.prerequisites && (
                  <div>
                    <h3 className="font-semibold mb-2">Prerequisites</h3>
                    <p className="text-gray-700">{topic.prerequisites}</p>
                  </div>
                )}
                
                <Tabs defaultValue="discussions">
                  <TabsList>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                  <TabsContent value="discussions" className="py-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <p className="text-gray-500 text-center">No discussions yet. Be the first to ask a question!</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="py-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <p className="text-gray-500 text-center">No additional resources available.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Topic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Deadline: {new Date(topic.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact: {topic.contact}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Posted on: {new Date(topic.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  <span>Applications: {topic.applications || 0}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium mb-2">
                    Message to Teacher
                  </label>
                  <Textarea
                    placeholder="Explain why you're interested in this topic and what makes you a good candidate..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="mb-4"
                  />
                  <Button className="w-full" onClick={handleApply}>
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
