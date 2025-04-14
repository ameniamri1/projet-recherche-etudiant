
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
    console.log("Form submitted with data:", formData);
    toast({
      title: "Topic created successfully",
      description: "Your research topic has been published.",
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Research Topic</DialogTitle>
          <DialogDescription>
            Fill in the details of your research topic. Students will see this information when browsing topics.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the topic title"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Biology">Biology</option>
                <option value="Psychology">Psychology</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the research topic in detail"
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Input
                id="prerequisites"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                placeholder="Required skills or knowledge"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deadline">Application Deadline</Label>
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
                <Label htmlFor="contact">Contact Information</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Email or phone number"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Topic</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
