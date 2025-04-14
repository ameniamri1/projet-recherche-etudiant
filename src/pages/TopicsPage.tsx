
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopicsList from "@/components/topics/TopicsList";
import TopicsFilter from "@/components/topics/TopicsFilter";
import { mockedTopics } from "@/data/mockedData";

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    deadline: "all",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Research Topics</h1>
          <p className="text-gray-600">Browse and apply for available research opportunities</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="lg:w-1/4">
            <TopicsFilter filters={filters} setFilters={setFilters} />
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            {/* Search bar */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button>Search</Button>
            </div>

            {/* Topics list */}
            <TopicsList topics={mockedTopics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;
