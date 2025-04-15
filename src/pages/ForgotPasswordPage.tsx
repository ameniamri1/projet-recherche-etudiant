
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Reset link sent",
      description: "If an account exists with this email, you will receive a password reset link",
    });
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
                <Key className="h-6 w-6" />
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Enter your email to receive a password reset link
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {!isSubmitted ? (
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
                    
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Send Reset Link
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="py-4 text-center">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Check your inbox</h3>
                  <p className="text-gray-600 mb-4">
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Didn't receive an email? Check your spam folder or{" "}
                    <button 
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      try again
                    </button>
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center pb-6 pt-2">
              <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
                Back to Login
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
