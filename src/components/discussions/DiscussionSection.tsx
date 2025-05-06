
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Edit2, Trash2, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Discussion, DiscussionRequest } from "@/types/types";
import { DiscussionService, AuthService } from "@/services";

interface DiscussionSectionProps {
  topicId: string;
}

const DiscussionSection = ({ topicId }: DiscussionSectionProps) => {
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string } | null>(null);
  const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadCurrentUser();
    loadDiscussions();
  }, [topicId]);

  const loadCurrentUser = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setCurrentUser({
        id: user.id,
        role: user.role
      });
    } catch (error) {
      console.error("Failed to load current user:", error);
      if (import.meta.env.MODE === 'development') {
        setCurrentUser({
          id: "current-user-id",
          role: "ROLE_STUDENT"
        });
      }
    }
  };

  const loadDiscussions = async () => {
    setIsLoading(true);
    try {
      const data = await DiscussionService.getDiscussions(topicId);
      setDiscussions(data);
    } catch (error) {
      console.error(`Failed to load discussions for topic ${topicId}:`, error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les discussions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      const discussionRequest: DiscussionRequest = {
        message: newMessage
      };
      
      const newDiscussion = await DiscussionService.createDiscussion(topicId, discussionRequest);
      setDiscussions(prev => [newDiscussion, ...prev]);
      setNewMessage("");
      
      toast({
        title: "Message envoyé",
        description: "Votre message a été publié avec succès",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleEditDiscussion = (discussion: Discussion) => {
    setEditingDiscussionId(discussion.id);
    setEditMessage(discussion.message);
  };

  const handleSaveEdit = async () => {
    if (!editingDiscussionId || !editMessage.trim()) return;
    
    try {
      const discussionRequest: DiscussionRequest = {
        message: editMessage
      };
      
      const updatedDiscussion = await DiscussionService.updateDiscussion(
        topicId, 
        editingDiscussionId, 
        discussionRequest
      );
      
      setDiscussions(prev => 
        prev.map(d => d.id === editingDiscussionId ? updatedDiscussion : d)
      );
      
      setEditingDiscussionId(null);
      setEditMessage("");
      
      toast({
        title: "Message modifié",
        description: "Votre message a été mis à jour avec succès",
      });
    } catch (error) {
      console.error("Failed to update message:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le message",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (discussionId: string) => {
    setDiscussionToDelete(discussionId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!discussionToDelete) return;
    
    try {
      const success = await DiscussionService.deleteDiscussion(topicId, discussionToDelete);
      
      if (success) {
        setDiscussions(prev => prev.filter(d => d.id !== discussionToDelete));
        
        toast({
          title: "Message supprimé",
          description: "Le message a été supprimé avec succès",
        });
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le message",
        variant: "destructive",
      });
    } finally {
      setDiscussionToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Si c'est aujourd'hui
    if (date.toDateString() === now.toDateString()) {
      return `Aujourd'hui à ${format(date, "HH:mm")}`;
    }
    
    // Si c'est hier
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Hier à ${format(date, "HH:mm")}`;
    }
    
    // Si c'est cette semaine
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return `${format(date, "EEEE", { locale: fr })} à ${format(date, "HH:mm")}`;
    }
    
    // Sinon
    return format(date, "dd/MM/yyyy à HH:mm");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const canEditOrDelete = (discussion: Discussion) => {
    return currentUser && (
      discussion.userId === currentUser.id || 
      ["ROLE_ADMIN", "ROLE_TEACHER"].includes(currentUser.role)
    );
  };

  return (
    <div className="space-y-4">
      {/* Zone de saisie de message */}
      <div className="p-4 border rounded-lg bg-white">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-indigo-100 text-indigo-800">
              {currentUser ? getInitials("Current User") : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-2">
            <Textarea
              placeholder="Posez une question ou partagez vos réflexions..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="resize-none min-h-[80px]"
              disabled={isSending}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim() || isSending}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" /> Publier
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des discussions */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : discussions.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Aucune discussion pour le moment</p>
              <p className="text-sm text-gray-400">Soyez le premier à poser une question!</p>
            </div>
          ) : (
            <ScrollArea className="max-h-[400px] px-2">
              <div className="divide-y">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="py-4 px-3">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`${
                          discussion.userRole === "ROLE_TEACHER" ? "bg-blue-100 text-blue-800" : "bg-indigo-100 text-indigo-800"
                        }`}>
                          {getInitials(discussion.userName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{discussion.userName}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              {discussion.userRole === "ROLE_TEACHER" ? "Enseignant" : "Étudiant"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> 
                            {formatDate(discussion.createdAt)}
                          </div>
                        </div>
                        
                        {editingDiscussionId === discussion.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editMessage}
                              onChange={(e) => setEditMessage(e.target.value)}
                              className="resize-none min-h-[80px] w-full"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingDiscussionId(null)}
                              >
                                Annuler
                              </Button>
                              <Button 
                                size="sm"
                                onClick={handleSaveEdit}
                                disabled={!editMessage.trim()}
                              >
                                Enregistrer
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700">{discussion.message}</p>
                        )}
                        
                        {canEditOrDelete(discussion) && !editingDiscussionId && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-gray-500 hover:text-indigo-600"
                              onClick={() => handleEditDiscussion(discussion)}
                            >
                              <Edit2 className="h-3.5 w-3.5 mr-1" /> Modifier
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-gray-500 hover:text-red-600"
                              onClick={() => handleDeleteClick(discussion.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" /> Supprimer
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le message</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce message? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscussionSection;
