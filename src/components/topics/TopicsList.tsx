
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Topic } from "@/types/types";
import { Calendar, User, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteTopic } from "@/utils/crudUtils";
import { useToast } from "@/hooks/use-toast";

interface TopicsListProps {
  topics: Topic[];
  isTeacherView?: boolean;
  onDelete?: () => void;
}

const TopicsList = ({ topics, isTeacherView = false, onDelete }: TopicsListProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const success = deleteTopic(id);
    
    if (success) {
      toast({
        title: "Sujet supprimé",
        description: "Le sujet a été supprimé avec succès",
      });
      
      if (onDelete) {
        onDelete();
      }
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du sujet",
        variant: "destructive",
      });
    }
  };

  if (topics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun sujet trouvé</p>
      </div>
    );
  }

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
              <span>Date limite: {new Date(topic.deadline).toLocaleDateString()}</span>
            </div>
            {topic.prerequisites && (
              <div className="flex items-center text-sm text-gray-500">
                <User className="mr-2 h-4 w-4" />
                <span>Prérequis: {topic.prerequisites}</span>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between">
            {isTeacherView ? (
              <>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/edit-topic/${topic.id}`}>Modifier</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer ce sujet ? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(topic.id)} className="bg-red-600 hover:bg-red-700">
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{topic.applications || 0} candidatures</Badge>
                  <Button size="sm" asChild>
                    <Link to={`/topic/${topic.id}`}>Voir détails</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/topic/${topic.id}`}>Voir détails</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to={`/topic/${topic.id}`}>Postuler</Link>
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopicsList;
