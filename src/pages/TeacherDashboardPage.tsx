
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicsList from "@/components/topics/TopicsList";
import ApplicationsList from "@/components/applications/ApplicationsList";
import CreateTopicDialog from "@/components/topics/CreateTopicDialog";
import { mockedTopics, mockedApplications } from "@/data/mockedData";

const TeacherDashboardPage = () => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <Button onClick={() => setIsCreateTopicOpen(true)}>Create New Topic</Button>
        </div>

        <Tabs defaultValue="topics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="topics">My Topics</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="students">Accepted Students</TabsTrigger>
          </TabsList>
          
          <TabsContent value="topics">
            <TopicsList topics={mockedTopics} isTeacherView={true} />
          </TabsContent>
          
          <TabsContent value="applications">
            <ApplicationsList applications={mockedApplications} />
          </TabsContent>
          
          <TabsContent value="students">
            <div className="p-8 text-center text-gray-500">
              <p>Currently no accepted students</p>
            </div>
          </TabsContent>
        </Tabs>

        <CreateTopicDialog isOpen={isCreateTopicOpen} setIsOpen={setIsCreateTopicOpen} />
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
