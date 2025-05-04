
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createTopic } from "@/utils/crudUtils";

interface CreateTopicDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateTopicDialog = ({ isOpen, setIsOpen }: CreateTopicDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prerequisites: "",
    deadline: "",
    contact: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.category || !formData.deadline || !formData.contact) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Create new topic
    try {
      const newTopic = createTopic({
        title: formData.title,
        description: formData.description,
        teacherId: "t1", // In a real app, this would be the current user's ID
        teacherName: "Dr. Sarah Johnson", // In a real app, this would be the current user's name
        category: formData.category,
        prerequisites: formData.prerequisites,
        deadline: new Date(formData.deadline).toISOString(),
        contact: formData.contact,
      });

      toast({
        title: "Sujet créé avec succès",
        description: "Votre sujet de recherche a été publié.",
      });

      setIsOpen(false);
      setFormData({
        title: "",
        description: "",
        prerequisites: "",
        deadline: "",
        contact: "",
        category: "",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du sujet",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau sujet de recherche</DialogTitle>
          <DialogDescription>
            Remplissez les détails de votre sujet de recherche. Les étudiants verront ces informations lors de la consultation des sujets.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Entrez le titre du sujet"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Catégorie</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>Sélectionnez une catégorie</option>
                <option value="Computer Science">Informatique</option>
                <option value="Biology">Biologie</option>
                <option value="Psychology">Psychologie</option>
                <option value="Engineering">Ingénierie</option>
                <option value="Mathematics">Mathématiques</option>
                <option value="Physics">Physique</option>
                <option value="Chemistry">Chimie</option>
              </select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez le sujet de recherche en détail"
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="prerequisites">Prérequis</Label>
              <Input
                id="prerequisites"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                placeholder="Compétences ou connaissances requises"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deadline">Date limite de candidature</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contact">Informations de contact</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Email ou numéro de téléphone"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer le sujet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
