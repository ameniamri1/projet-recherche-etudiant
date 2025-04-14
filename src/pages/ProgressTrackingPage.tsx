
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ClipboardList, MessageCircle, BookOpen, FileText, BadgeCheck, Clock, Calendar, Stars, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockedTopics } from "@/data/mockedData";

// Mock student data
const student = {
  id: "student1",
  name: "Alice Smith",
  avatar: "",
  progress: 65,
  startDate: "2023-03-15",
  status: "In Progress",
  lastUpdate: "2023-04-10",
  submissions: [
    { id: "s1", title: "Initial Research Plan", date: "2023-03-20", status: "Approved", grade: "A", feedback: "Great start! The plan is well-structured and comprehensive." },
    { id: "s2", title: "Literature Review", date: "2023-03-30", status: "Approved", grade: "B+", feedback: "Good work, but could benefit from more recent references." },
    { id: "s3", title: "Methodology Draft", date: "2023-04-10", status: "Under Review", grade: null, feedback: null }
  ],
  milestones: [
    { id: "m1", title: "Project Plan Approval", dueDate: "2023-03-20", completed: true },
    { id: "m2", title: "Literature Review", dueDate: "2023-03-30", completed: true },
    { id: "m3", title: "Methodology Draft", dueDate: "2023-04-10", completed: true },
    { id: "m4", title: "Initial Results", dueDate: "2023-04-25", completed: false },
    { id: "m5", title: "Full Draft", dueDate: "2023-05-10", completed: false },
    { id: "m6", title: "Final Submission", dueDate: "2023-05-30", completed: false }
  ]
};

// Mock feedback data
const feedbacks = [
  { 
    id: "f1", 
    date: "2023-03-21", 
    sender: "teacher", 
    content: "Your project plan looks excellent. I especially like your approach to the research question. Let's schedule a meeting next week to discuss the next steps." 
  },
  { 
    id: "f2", 
    date: "2023-03-31", 
    sender: "teacher", 
    content: "The literature review is good, but I'd recommend incorporating more recent papers from the last 2-3 years. Also, consider adding a section about the theoretical framework." 
  },
  { 
    id: "f3", 
    date: "2023-04-02", 
    sender: "student", 
    content: "Thank you for the feedback. I'll look for more recent papers and add the section on theoretical framework. Would it be possible to schedule a meeting to discuss this further?" 
  },
  { 
    id: "f4", 
    date: "2023-04-03", 
    sender: "teacher", 
    content: "Certainly! How about Wednesday at 2 PM? We can meet in my office or have a video call if you prefer." 
  },
  { 
    id: "f5", 
    date: "2023-04-03", 
    sender: "student", 
    content: "Wednesday at 2 PM works perfectly. I'll come to your office. Thank you!" 
  }
];

const ProgressTrackingPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState(mockedTopics.find(t => t.id === topicId));
  const [activeTab, setActiveTab] = useState("progress");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { toast } = useToast();
  
  const handleSendFeedback = () => {
    if (!feedbackMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a feedback message",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Feedback sent",
      description: "Your feedback has been sent to the student",
    });
    
    setFeedbackMessage("");
  };

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
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">Student Progress</h1>
            <p className="text-gray-600 flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {topic.title}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-white shadow-sm border-gray-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-indigo-100 text-indigo-800">
                      {student.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.status}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Overall Progress</span>
                    <span className="text-sm font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Started:</span>
                    <span className="font-medium">{new Date(student.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Update:</span>
                    <span className="font-medium">{new Date(student.lastUpdate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Milestones Completed:</span>
                    <span className="font-medium">{student.milestones.filter(m => m.completed).length}/{student.milestones.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submissions:</span>
                    <span className="font-medium">{student.submissions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Upcoming Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {student.milestones
                    .filter(m => !m.completed)
                    .slice(0, 3)
                    .map((milestone) => (
                      <div key={milestone.id} className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{milestone.title}</p>
                          <p className="text-xs text-gray-500">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  
                  {student.milestones.filter(m => !m.completed).length === 0 && (
                    <p className="text-sm text-gray-500">No upcoming milestones</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-white shadow-sm border-gray-200">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full bg-gray-50 border-b rounded-none">
                  <TabsTrigger 
                    value="progress" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Progress
                  </TabsTrigger>
                  <TabsTrigger 
                    value="submissions" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Submissions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="feedback" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Feedback
                  </TabsTrigger>
                </TabsList>
                
                {/* Progress Tab */}
                <TabsContent value="progress" className="px-6 py-4">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-800">Milestones</h3>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Update Milestones
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {student.milestones.map((milestone, index) => (
                          <div 
                            key={milestone.id} 
                            className={`p-4 border rounded-lg ${milestone.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full ${milestone.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                                  {milestone.completed ? (
                                    <BadgeCheck className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <Clock className="h-5 w-5 text-amber-500" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-800">
                                      {index + 1}. {milestone.title}
                                    </h4>
                                    {milestone.completed && (
                                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Completed</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              {!milestone.completed && (
                                <Button size="sm">Mark as Complete</Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium text-gray-800">Progress Notes</h3>
                      <Card className="border-dashed">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Add Progress Note</CardTitle>
                          <CardDescription>Record updates or notes about the student's progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea 
                            placeholder="Enter your progress note here..."
                            className="resize-none"
                            rows={3}
                          />
                        </CardContent>
                        <CardFooter className="flex justify-end pt-0">
                          <Button>Save Note</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Submissions Tab */}
                <TabsContent value="submissions" className="px-6 py-4">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Student Submissions</h3>
                      
                      {student.submissions.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed rounded-lg">
                          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <h3 className="text-lg font-medium text-gray-700">No submissions yet</h3>
                          <p className="text-gray-500 mt-1">The student hasn't submitted any documents yet</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {student.submissions.map((submission) => (
                            <Card key={submission.id} className={
                              submission.status === "Approved" 
                                ? "bg-green-50 border-green-200" 
                                : submission.status === "Under Review"
                                ? "bg-amber-50 border-amber-200"
                                : "bg-red-50 border-red-200"
                            }>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle>{submission.title}</CardTitle>
                                    <CardDescription>
                                      Submitted on: {new Date(submission.date).toLocaleDateString()}
                                    </CardDescription>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {submission.grade && (
                                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
                                        Grade: {submission.grade}
                                      </span>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                      ${submission.status === "Approved" 
                                        ? "bg-green-100 text-green-800" 
                                        : submission.status === "Under Review"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {submission.status}
                                    </span>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                {submission.feedback ? (
                                  <div>
                                    <h4 className="font-medium text-gray-700 text-sm mb-1">Feedback:</h4>
                                    <p className="text-gray-600">{submission.feedback}</p>
                                  </div>
                                ) : (
                                  <p className="text-gray-500 italic">No feedback provided yet</p>
                                )}
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                  View Document
                                </Button>
                                {submission.status === "Under Review" && (
                                  <div className="flex gap-2">
                                    <Button variant="destructive" size="sm">
                                      Reject
                                    </Button>
                                    <Button size="sm">
                                      Approve
                                    </Button>
                                  </div>
                                )}
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Feedback Tab */}
                <TabsContent value="feedback" className="px-6 py-4">
                  <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Stars className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-gray-800">Provide Regular Feedback</h3>
                          <p className="text-sm text-gray-600">
                            Regular feedback helps students improve and stay on track with their research.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 max-h-96 overflow-y-auto p-2">
                      {feedbacks.map((feedback) => (
                        <div 
                          key={feedback.id}
                          className={`flex ${feedback.sender === 'teacher' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              feedback.sender === 'teacher'
                                ? 'bg-gray-100 text-gray-800 rounded-bl-none'
                                : 'bg-indigo-100 text-indigo-800 rounded-br-none'
                            }`}
                          >
                            <p>{feedback.content}</p>
                            <div className="text-xs mt-1 text-gray-500">
                              {new Date(feedback.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="feedback">New Feedback</Label>
                        <div className="relative">
                          <Textarea
                            id="feedback"
                            placeholder="Type your feedback message..."
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                            className="pr-12 resize-none"
                            rows={3}
                          />
                          <Button
                            size="sm"
                            className="absolute bottom-2 right-2"
                            onClick={handleSendFeedback}
                            disabled={!feedbackMessage.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingPage;
