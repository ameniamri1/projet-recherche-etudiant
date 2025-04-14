
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Search, Send, MoreVertical, Phone, Video } from "lucide-react";
import { mockedTopics } from "@/data/mockedData";

// Mock messaging data
const conversations = [
  {
    id: "1",
    avatar: "",
    name: "Prof. David Wilson",
    role: "teacher",
    lastMessage: "Yes, you can submit your application by Friday.",
    time: "10:45 AM",
    unread: 2,
    topicId: mockedTopics[0].id,
    topicTitle: mockedTopics[0].title,
    messages: [
      { id: "m1", sender: "teacher", text: "Hello, I saw your application for the research topic.", time: "Yesterday, 4:30 PM" },
      { id: "m2", sender: "student", text: "Yes, I'm very interested in working on machine learning algorithms.", time: "Yesterday, 4:35 PM" },
      { id: "m3", sender: "teacher", text: "Great! Could you tell me more about your previous experience with neural networks?", time: "Yesterday, 4:40 PM" },
      { id: "m4", sender: "student", text: "I've worked on several projects involving convolutional neural networks during my internship last summer.", time: "Yesterday, 4:50 PM" },
      { id: "m5", sender: "teacher", text: "That's excellent. Do you have any questions about the research topic?", time: "Yesterday, 5:00 PM" },
      { id: "m6", sender: "student", text: "Yes, I was wondering about the deadline for the application?", time: "Today, 10:40 AM" },
      { id: "m7", sender: "teacher", text: "Yes, you can submit your application by Friday.", time: "Today, 10:45 AM" },
    ]
  },
  {
    id: "2",
    avatar: "",
    name: "Dr. Sarah Johnson",
    role: "teacher",
    lastMessage: "Please look at the updated guidelines for the database project.",
    time: "Yesterday",
    unread: 0,
    topicId: mockedTopics[1].id,
    topicTitle: mockedTopics[1].title,
    messages: [
      { id: "m1", sender: "teacher", text: "Hello, I'm Dr. Johnson, the supervisor for the database research project.", time: "3 days ago, 2:15 PM" },
      { id: "m2", sender: "student", text: "Hello Dr. Johnson, thank you for accepting my application.", time: "3 days ago, 2:30 PM" },
      { id: "m3", sender: "teacher", text: "You're welcome. I was impressed by your previous work with SQL databases.", time: "3 days ago, 3:00 PM" },
      { id: "m4", sender: "teacher", text: "Please look at the updated guidelines for the database project.", time: "Yesterday, 1:20 PM" },
    ]
  },
  {
    id: "3",
    avatar: "",
    name: "Prof. Michael Brown",
    role: "teacher",
    lastMessage: "The meeting is scheduled for tomorrow at 3 PM in Room 302.",
    time: "Mon",
    unread: 0,
    topicId: mockedTopics[2].id,
    topicTitle: mockedTopics[2].title,
    messages: [
      { id: "m1", sender: "teacher", text: "Hello, I'd like to schedule a meeting to discuss the psychology research project.", time: "Monday, 9:15 AM" },
      { id: "m2", sender: "student", text: "I'm available tomorrow afternoon.", time: "Monday, 9:45 AM" },
      { id: "m3", sender: "teacher", text: "Perfect. The meeting is scheduled for tomorrow at 3 PM in Room 302.", time: "Monday, 10:00 AM" },
    ]
  }
];

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [userMessages, setUserMessages] = useState<Record<string, any[]>>({});

  const filteredConversations = conversations.filter(
    convo => convo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             convo.topicTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `new-${Date.now()}`,
      sender: "student",
      text: messageText,
      time: "Just now"
    };
    
    const updatedUserMessages = {
      ...userMessages,
      [activeConversation.id]: [
        ...(userMessages[activeConversation.id] || []),
        newMessage
      ]
    };
    
    setUserMessages(updatedUserMessages);
    setMessageText("");
  };

  const getConversationMessages = (conversationId: string) => {
    const conversationBase = conversations.find(c => c.id === conversationId);
    const userAdded = userMessages[conversationId] || [];
    
    return [...(conversationBase?.messages || []), ...userAdded];
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
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
          <p className="text-gray-600">Communicate with teachers and students about research topics</p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-240px)] min-h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Conversations list */}
          <div className="h-full border rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100%-60px)]">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 ${activeConversation.id === conversation.id ? 'bg-indigo-50' : ''}`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="flex gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-indigo-100 text-indigo-800">
                            {getInitials(conversation.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 truncate">{conversation.name}</h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-0 h-5"
                            >
                              {conversation.topicTitle}
                            </Badge>
                            {conversation.unread > 0 && (
                              <Badge className="bg-indigo-600 text-white text-xs px-1.5 py-0 h-5 min-w-[20px] flex justify-center">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Messages area */}
          <div className="md:col-span-2 h-full">
            <Card className="h-full flex flex-col overflow-hidden">
              {/* Conversation header */}
              <div className="p-3 border-b flex justify-between items-center">
                {activeConversation ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-800">
                          {getInitials(activeConversation.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-800">{activeConversation.name}</h4>
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
                    Select a conversation
                  </div>
                )}
              </div>
              
              {/* Messages content */}
              {activeConversation ? (
                <>
                  <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                      {getConversationMessages(activeConversation.id).map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender === 'student'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                            }`}
                          >
                            <p>{message.text}</p>
                            <div 
                              className={`text-xs mt-1 ${
                                message.sender === 'student' ? 'text-indigo-200' : 'text-gray-500'
                              }`}
                            >
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Message input */}
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Input
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="pr-10"
                        />
                        <Button 
                          size="sm" 
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={handleSendMessage}
                          disabled={!messageText.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex items-center justify-center">
                  <div className="text-center p-6">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-700">No conversation selected</h3>
                    <p className="text-gray-500">Select a conversation from the list to start messaging</p>
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
