
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCheck, Clock, BookOpen, MessageCircle, Calendar, CircleCheck, AlertCircle, CheckCircle2 } from "lucide-react";

// Mock notifications data
const allNotifications = [
  {
    id: "1",
    title: "Application Accepted",
    message: "Your application for 'Machine Learning Algorithms' has been accepted.",
    date: "2023-04-12T10:30:00Z",
    type: "application",
    status: "accepted",
    read: false,
    link: "/topic/topic1",
    linkText: "View Topic"
  },
  {
    id: "2",
    title: "New Research Topic",
    message: "A new research topic in Computer Science has been published: 'Blockchain Applications in Finance'",
    date: "2023-04-10T14:20:00Z",
    type: "topic",
    read: true,
    link: "/topics",
    linkText: "Browse Topics"
  },
  {
    id: "3",
    title: "Application Deadline",
    message: "Deadline approaching for 'Neural Networks' application in 2 days.",
    date: "2023-04-08T09:15:00Z",
    type: "deadline",
    read: true,
    link: "/topics",
    linkText: "Apply Now"
  },
  {
    id: "4",
    title: "New Message",
    message: "You have received a new message from Prof. David Wilson regarding your application.",
    date: "2023-04-06T16:45:00Z",
    type: "message",
    read: false,
    link: "/messages",
    linkText: "Read Message"
  },
  {
    id: "5",
    title: "Application Under Review",
    message: "Your application for 'Data Visualization Techniques' is being reviewed.",
    date: "2023-04-05T11:10:00Z",
    type: "application",
    status: "pending",
    read: true,
    link: "/student-dashboard",
    linkText: "View Application"
  },
  {
    id: "6",
    title: "Application Rejected",
    message: "Your application for 'Quantum Computing Basics' was not accepted.",
    date: "2023-04-03T13:25:00Z",
    type: "application",
    status: "rejected",
    read: true,
    link: "/student-dashboard",
    linkText: "View Details"
  },
  {
    id: "7",
    title: "System Maintenance",
    message: "The platform will be under maintenance on Saturday from 2 AM to 4 AM.",
    date: "2023-04-01T08:00:00Z",
    type: "system",
    read: true,
    link: "#",
    linkText: "Learn More"
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState("all");
  
  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(notification => !notification.read);
      case "applications":
        return notifications.filter(notification => notification.type === "application");
      case "topics":
        return notifications.filter(notification => notification.type === "topic");
      case "messages":
        return notifications.filter(notification => notification.type === "message");
      default:
        return notifications;
    }
  };
  
  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getNotificationIcon = (type: string, status?: string) => {
    switch (type) {
      case "application":
        if (status === "accepted") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        if (status === "rejected") return <AlertCircle className="h-5 w-5 text-red-500" />;
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "topic":
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-indigo-500" />;
      case "deadline":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatDate = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // This week
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    }
    
    // Older
    return date.toLocaleDateString();
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
            <Bell className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Notifications</h1>
          </div>
          <p className="text-gray-600">Stay updated with the latest activity on your research topics</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle>All Notifications</CardTitle>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500">
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex gap-2 sm:justify-end">
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="mr-1 h-4 w-4" />
                  Mark all read
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-gray-50 p-0 rounded-none border-b">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unread" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    Unread
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    Applications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="topics" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    Topics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="messages" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    Messages
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="m-0">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-800 mb-1">No notifications</h3>
                      <p className="text-gray-500">
                        {activeTab === "all" ? "You have no notifications at the moment." : `No ${activeTab} notifications.`}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 md:p-6 ${!notification.read ? 'bg-indigo-50' : ''} hover:bg-gray-50`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-indigo-100'}`}>
                              {getNotificationIcon(notification.type, notification.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {formatDate(notification.date)}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-1">{notification.message}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <Button asChild variant="outline" size="sm">
                                  <Link to={notification.link}>{notification.linkText}</Link>
                                </Button>
                                {!notification.read && (
                                  <Badge className="bg-indigo-600">New</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationsPage;
