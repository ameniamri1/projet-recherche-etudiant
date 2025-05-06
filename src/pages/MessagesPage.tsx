
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Search, Send, MoreVertical, Phone, Video } from "lucide-react";
import { Conversation, Message, tunisianNames } from "@/types/types";
import { MessageService, AuthService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

const MessagesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string } | null>(null);

  useEffect(() => {
    loadCurrentUser();
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation.id);
    }
  }, [activeConversation]);

  const loadCurrentUser = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setCurrentUser({
        id: user.id,
        role: user.role
      });
    } catch (error) {
      console.error("Failed to load current user:", error);
      // En mode développement, on simule un utilisateur
      if (import.meta.env.MODE === 'development') {
        setCurrentUser({
          id: "student1",
          role: "ROLE_STUDENT"
        });
      }
    }
  };

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const data = await MessageService.getConversations();
      setConversations(data);
      if (data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }
    } catch (error) {
      console.error("Impossible de charger les conversations:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les conversations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await MessageService.getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error(`Impossible de charger les messages pour la conversation ${conversationId}:`, error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeConversation || !currentUser) return;
    
    setIsSending(true);
    
    try {
      const newMessage = await MessageService.sendMessage(activeConversation.id, messageText);
      setMessages(prev => [...prev, newMessage]);
      
      // Mettre à jour la conversation avec le dernier message
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversation.id 
            ? { 
                ...conv, 
                lastMessage: messageText,
                lastMessageTime: new Date().toISOString()
              } 
            : conv
        )
      );
      
      setMessageText("");
    } catch (error) {
      console.error("Impossible d'envoyer le message:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(
    convo => 
      convo.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      convo.topicTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Si c'est aujourd'hui
    if (date.toDateString() === now.toDateString()) {
      return format(date, "HH:mm");
    }
    
    // Si c'est cette semaine
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    }
    
    // Sinon
    return format(date, "dd/MM/yyyy", { locale: fr });
  };

  const formatConversationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Si c'est aujourd'hui
    if (date.toDateString() === now.toDateString()) {
      return format(date, "HH:mm");
    }
    
    // Si c'est cette semaine
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return format(date, "EEEE", { locale: fr });
    }
    
    // Sinon
    return format(date, "dd/MM/yyyy", { locale: fr });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (!currentUser) return { name: "", role: "" };
    return conversation.participants.find(p => p.id !== currentUser.id) || { name: "", role: "" };
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Messages</h1>
          </div>
          <p className="text-gray-600">Communiquez avec les enseignants et les étudiants à propos des sujets de recherche</p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-240px)] min-h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Liste des conversations */}
          <div className="h-full border rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100%-60px)]">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Aucune conversation trouvée
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conversation) => {
                    const otherParticipant = getOtherParticipant(conversation);
                    
                    return (
                      <div 
                        key={conversation.id}
                        className={`p-3 cursor-pointer hover:bg-gray-50 ${activeConversation?.id === conversation.id ? 'bg-indigo-50' : ''}`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-indigo-100 text-indigo-800">
                              {getInitials(otherParticipant.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-800 truncate">{otherParticipant.name}</h4>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                {formatConversationTime(conversation.lastMessageTime)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-0 h-5"
                              >
                                {conversation.topicTitle}
                              </Badge>
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-indigo-600 text-white text-xs px-1.5 py-0 h-5 min-w-[20px] flex justify-center">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Zone de messages */}
          <div className="md:col-span-2 h-full">
            <Card className="h-full flex flex-col overflow-hidden">
              {/* En-tête de la conversation */}
              <div className="p-3 border-b flex justify-between items-center">
                {activeConversation ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-800">
                          {getInitials(getOtherParticipant(activeConversation).name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-800">{getOtherParticipant(activeConversation).name}</h4>
                        <p className="text-xs text-gray-500">{activeConversation.topicTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full text-center text-gray-500">
                    Sélectionnez une conversation
                  </div>
                )}
              </div>
              
              {/* Contenu des messages */}
              {activeConversation ? (
                <>
                  <ScrollArea className="flex-grow p-4">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">Commencez à discuter</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => {
                          const isCurrentUser = currentUser && message.senderId === currentUser.id;
                          
                          return (
                            <div 
                              key={message.id}
                              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[70%] rounded-lg p-3 ${
                                  isCurrentUser
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                              >
                                <p>{message.text}</p>
                                <div 
                                  className={`text-xs mt-1 ${
                                    isCurrentUser ? 'text-indigo-200' : 'text-gray-500'
                                  }`}
                                >
                                  {formatMessageTime(message.createdAt)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>
                  
                  {/* Saisie de message */}
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Input
                          placeholder="Écrivez un message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                          className="pr-10"
                          disabled={isSending}
                        />
                        <Button 
                          size="sm" 
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={handleSendMessage}
                          disabled={!messageText.trim() || isSending}
                        >
                          {isSending ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex items-center justify-center">
                  <div className="text-center p-6">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">Aucune conversation sélectionnée</h3>
                    <p className="text-gray-500">Sélectionnez une conversation dans la liste pour commencer à discuter</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MessagesPage;
