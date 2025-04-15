
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import ENICarthageLanding from "./pages/ENICarthageLanding";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TopicsPage from "./pages/TopicsPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";
import PageLayout from "./components/layout/PageLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import PublishTopicPage from "./pages/PublishTopicPage";
import ManageCandidatesPage from "./pages/ManageCandidatesPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressTrackingPage from "./pages/ProgressTrackingPage";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ENICarthageLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topic/:id" element={<TopicDetailPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
        <Route path="/student-dashboard" element={<StudentDashboardPage />} />
        <Route path="/publish-topic" element={<PublishTopicPage />} />
        <Route path="/manage-candidates/:topicId" element={<ManageCandidatesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/progress/:topicId" element={<ProgressTrackingPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageLayout>
          <AnimatedRoutes />
        </PageLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
