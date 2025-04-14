
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Topic } from "@/types/types";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface TopicsListProps {
  topics: Topic[];
  isTeacherView?: boolean;
}

const TopicsList = ({ topics, isTeacherView = false }: TopicsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {topics.map((topic) => (
        <Card key={topic.id} className="overflow-hidden border-gray-200 hover:border-gray-300 transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription className="mt-1">{topic.teacherName}</CardDescription>
              </div>
              <Badge variant={topic.category === "Computer Science" ? "default" : "outline"}>
                {topic.category}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-4 line-clamp-3">{topic.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Deadline: {new Date(topic.deadline).toLocaleDateString()}</span>
            </div>
            {topic.prerequisites && (
              <div className="flex items-center text-sm text-gray-500">
                <User className="mr-2 h-4 w-4" />
                <span>Prerequisites: {topic.prerequisites}</span>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between">
            {isTeacherView ? (
              <>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{topic.applications || 0} applications</Badge>
                  <Button size="sm" asChild>
                    <Link to={`/topic/${topic.id}`}>View Details</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/topic/${topic.id}`}>View Details</Link>
                </Button>
                <Button size="sm">Apply Now</Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopicsList;
