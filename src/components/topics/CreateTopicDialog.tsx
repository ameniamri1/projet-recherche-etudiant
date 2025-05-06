import { useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TopicService } from "@/services";
import { TopicRequest } from "@/types/types";

interface CreateTopicDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onTopicCreated?: () => void;
}

const CreateTopicDialog: React.FC<CreateTopicDialogProps> = ({ open, setOpen, onTopicCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !date?.from || !date?.to) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newTopic: TopicRequest = {
        title,
        description,
        category,
        prerequisites,
        contact,
        deadline: date.to.toISOString(), // Utilisez la date de fin comme deadline
      };

      await TopicService.createTopic(newTopic);

      toast({
        title: "Succès",
        description: "Le sujet a été créé avec succès.",
      });

      // Réinitialiser les champs du formulaire
      setTitle("");
      setDescription("");
      setCategory("");
      setPrerequisites("");
      setContact("");
      setDate(undefined);

      // Fermer la boîte de dialogue
      setOpen(false);

      // Notifier le composant parent que le sujet a été créé
      if (onTopicCreated) {
        onTopicCreated();
      }
    } catch (error) {
      console.error("Erreur lors de la création du sujet:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création du sujet.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau sujet</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau sujet pour que les étudiants puissent postuler.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Catégorie
              </Label>
              <Input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prerequisites" className="text-right">
                Prérequis
              </Label>
              <Input
                type="text"
                id="prerequisites"
                value={prerequisites}
                onChange={(e) => setPrerequisites(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Date limite
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="col-span-3 pl-3 text-left font-normal"
                  >
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "dd/MM/yyyy")} - ${format(
                          date.to,
                          "dd/MM/yyyy"
                        )}`
                      ) : (
                        format(date.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Choisir une date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    pagedNavigation
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
