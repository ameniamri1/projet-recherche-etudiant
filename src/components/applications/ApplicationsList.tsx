
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ApplicationService } from "@/services";
import { ApplicationStatusUpdateRequest } from "@/types/types";

interface ApplicationsListProps {
  applications: Application[];
  onUpdate?: () => void;
}

const ApplicationsList = ({ applications, onUpdate }: ApplicationsListProps) => {
  const { toast } = useToast();
  const [processingApplicationId, setProcessingApplicationId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, status: "ACCEPTED" | "DECLINED", feedback?: string) => {
    setProcessingApplicationId(id);
    try {
      const statusUpdate: ApplicationStatusUpdateRequest = {
        status: status,
        feedback: feedback || undefined
      };
      
      await ApplicationService.updateApplicationStatus(id, statusUpdate);
      
      toast({
        title: status === "ACCEPTED" ? "Candidature acceptée" : "Candidature refusée",
        description: "Le statut de la candidature a été mis à jour avec succès",
      });

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la candidature",
        variant: "destructive",
      });
    } finally {
      setProcessingApplicationId(null);
    }
  };

  const handleRequestMoreInfo = (studentEmail: string) => {
    // Dans une version réelle, cela pourrait ouvrir un composant de messagerie ou envoyer un email
    toast({
      title: "Demande d'information",
      description: `Un email de demande d'informations sera envoyé à ${studentEmail}`,
    });
  };

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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRequestMoreInfo(application.studentId)}
                  disabled={!!processingApplicationId}
                >
                  Request More Info
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleStatusUpdate(application.id, "DECLINED")}
                  disabled={processingApplicationId === application.id}
                >
                  {processingApplicationId === application.id ? "Processing..." : "Decline"}
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleStatusUpdate(application.id, "ACCEPTED")}
                  disabled={processingApplicationId === application.id}
                >
                  {processingApplicationId === application.id ? "Processing..." : "Accept"}
                </Button>
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
