
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/lovable-uploads/photo-1487958449943-2429e8be8625.jpg" 
            alt="ENICarthage Logo" 
            className="h-32 w-auto mx-auto mb-4 rounded-lg shadow-md"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4 leading-tight">
            Research Project Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect students with research opportunities and help teachers find talented candidates for their projects
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-indigo-100 shadow-md hover:shadow-lg transition-all duration-300 h-full bg-gradient-to-br from-white to-indigo-50/50">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl text-indigo-700">For Teachers</CardTitle>
                <CardDescription>Publish and manage research topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Publish new research opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Manage student applications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Track student progress
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Provide feedback and evaluation
                  </li>
                </ul>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  <Link to="/teacher-dashboard" className="flex items-center justify-center gap-2">
                    Teacher Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-2 border-indigo-100 shadow-md hover:shadow-lg transition-all duration-300 h-full bg-gradient-to-br from-white to-indigo-50/50">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl text-indigo-700">For Students</CardTitle>
                <CardDescription>Find and apply for research topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Browse available research topics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Filter topics by categories and keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Apply for interesting projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Track your applications and progress
                  </li>
                </ul>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  <Link to="/topics" className="flex items-center justify-center gap-2">
                    Browse Topics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-600 mb-4">New to the platform?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-indigo-300">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
