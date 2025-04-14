
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Upload, FileText, X, Info, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PublishTopicPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !contact || !date) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your research topic has been published",
    });

    setTimeout(() => {
      navigate("/teacher-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Upload className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Publish Research Topic</h1>
          </div>
          <p className="text-gray-600">Create a new research opportunity for students</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Topic Details</CardTitle>
                <CardDescription>
                  Fill in the information below to create a new research topic
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your research topic"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the research topic"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="psychology">Psychology</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline <span className="text-red-500">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-left font-normal justify-start",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    placeholder="List any skills or knowledge students should have"
                    rows={3}
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information <span className="text-red-500">*</span></Label>
                  <Input
                    id="contact"
                    placeholder="Email or other contact information"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Resources & Documents (optional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Input
                      id="files"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="files" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-700 font-medium">
                          Drop files here or <span className="text-indigo-600">browse</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Upload any supporting documents (PDF, DOCX, etc.)
                        </p>
                      </div>
                    </Label>
                    
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Files ({selectedFiles.length})
                        </h4>
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between bg-gray-50 rounded p-2 text-sm"
                            >
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">{file.name}</span>
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Info className="h-5 w-5 text-blue-500 shrink-0" />
                  <p className="text-sm text-blue-600">
                    All research topics must comply with university guidelines. 
                    Students will be able to apply for your topic until the deadline.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-3 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <CalendarCheck className="h-4 w-4 mr-2" /> 
                  Publish Topic
                </Button>
              </CardFooter>
            </Card>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PublishTopicPage;
