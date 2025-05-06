
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/types";

interface ApplicationsListProps {
  applications: Application[];
}

const ApplicationsList = ({ applications }: ApplicationsListProps) => {
  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>{application.studentName}</CardTitle>
                <div className="text-sm text-gray-500">Applied for: {application.topicTitle}</div>
              </div>
              <Badge
                className="ml-2"
                variant={
                  application.status === "PENDING"
                    ? "outline"
                    : application.status === "ACCEPTED"
                    ? "default"
                    : "destructive"
                }
              >
                {application.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Student Message:</h4>
              <p className="text-gray-700">{application.message}</p>
            </div>
            {application.status === "PENDING" && (
              <div className="flex space-x-2 justify-end">
                <Button variant="outline" size="sm">
                  Request More Info
                </Button>
                <Button variant="destructive" size="sm">
                  Decline
                </Button>
                <Button size="sm">Accept</Button>
              </div>
            )}
            {application.status !== "PENDING" && (
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Message Student
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {applications.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-gray-500">No applications yet</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;
