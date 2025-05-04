
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getTopic, createApplication, getCurrentUser } from "@/utils/crudUtils";
import { Calendar, User, Mail, Clock, ArrowLeft, Send, MessageSquare, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Topic } from "@/types/types";

const TopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    if (!id) {
      toast({
        title: "Erreur",
        description: "ID de sujet manquant",
        variant: "destructive",
      });
      navigate("/topics");
      return;
    }
    
    const topicData = getTopic(id);
    if (topicData) {
      setTopic(topicData);
    } else {
      toast({
        title: "Erreur",
        description: "Sujet non trouvé",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  }, [id, toast, navigate]);
  
  const handleApply = () => {
    if (!applicationMessage.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez écrire un message à l'enseignant.",
        variant: "destructive"
      });
      return;
    }
    
    if (!topic || !id) {
      toast({
        title: "Erreur",
        description: "Sujet non valide",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would get the current user
    const currentUser = getCurrentUser() || {
      id: "s1",
      name: "Alex Thompson"
    };
    
    try {
      createApplication({
        topicId: id,
        topicTitle: topic.title,
        studentId: currentUser.id,
        studentName: currentUser.name,
        message: applicationMessage,
      });
      
      toast({
        title: "Candidature soumise",
        description: "Votre candidature a été envoyée à l'enseignant.",
      });
      
      setApplicationMessage("");
      
      // Reload the topic to update the applications count
      const updatedTopic = getTopic(id);
      if (updatedTopic) {
        setTopic(updatedTopic);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre candidature",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }
  
  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-red-200">
          <h2 className="text-2xl text-red-600 mb-4">Sujet non trouvé</h2>
          <p className="mb-6">Le sujet demandé est introuvable.</p>
          <Button asChild>
            <Link to="/topics">Retour aux Sujets</Link>
          </Button>
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
          <Link to="/topics" className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux Sujets
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
                    <h3 className="font-semibold text-gray-800 mb-2">Prérequis</h3>
                    <p className="text-gray-700">{topic.prerequisites}</p>
                  </div>
                )}
                
                <Tabs defaultValue="discussions">
                  <TabsList className="bg-gray-50 border border-gray-200">
                    <TabsTrigger value="discussions" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                      <MessageSquare className="h-4 w-4 mr-1" /> Discussions
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                      <FileText className="h-4 w-4 mr-1" /> Ressources
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="discussions" className="py-4">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-center">Pas encore de discussions. Soyez le premier à poser une question !</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="py-4">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-center">Aucune ressource supplémentaire disponible.</p>
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
                <CardTitle className="text-indigo-800">Postuler à ce sujet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Date limite: {new Date(topic.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Contact: {topic.contact}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Publié le: {new Date(topic.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <User className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Candidatures: {topic.applications || 0}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message à l'enseignant
                  </label>
                  <Textarea
                    placeholder="Expliquez pourquoi vous êtes intéressé par ce sujet et ce qui fait de vous un bon candidat..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="mb-4 resize-none min-h-[120px]"
                  />
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleApply}>
                    <Send className="h-4 w-4 mr-2" /> Soumettre la candidature
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
