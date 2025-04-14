
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LockKeyhole, Mail, UserCircle, School } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "You have successfully logged in!",
    });

    // Simulating login by redirecting to the dashboard based on user type
    setTimeout(() => {
      if (userType === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-lg border-indigo-100">
            <CardHeader className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex justify-center items-center gap-2">
                <LockKeyhole className="h-6 w-6" />
                Login to ResearchConnect
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="student" onValueChange={setUserType} className="w-full">
              <TabsList className="grid grid-cols-2 gap-4 px-4 py-4">
                <TabsTrigger value="student" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                  <UserCircle className="mr-2 h-4 w-4" /> Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                  <School className="mr-2 h-4 w-4" /> Teacher
                </TabsTrigger>
              </TabsList>
              
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          placeholder="your@email.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          autoComplete="current-password"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remember" 
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-500">Remember me</Label>
                      </div>
                      
                      <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Tabs>
            
            <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
