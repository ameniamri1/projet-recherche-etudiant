
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">Research Project Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect students with research opportunities and help teachers find talented candidates for their projects
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-700">For Teachers</CardTitle>
              <CardDescription>Publish and manage research topics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• Publish new research opportunities</li>
                <li>• Manage student applications</li>
                <li>• Track student progress</li>
                <li>• Provide feedback and evaluation</li>
              </ul>
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/teacher-dashboard">Teacher Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-700">For Students</CardTitle>
              <CardDescription>Find and apply for research topics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• Browse available research topics</li>
                <li>• Filter topics by categories and keywords</li>
                <li>• Apply for interesting projects</li>
                <li>• Track your applications and progress</li>
              </ul>
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/topics">Browse Topics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">New to the platform?</p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" className="border-indigo-300">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
