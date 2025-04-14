
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopicsList from "@/components/topics/TopicsList";
import TopicsFilter from "@/components/topics/TopicsFilter";
import { mockedTopics } from "@/data/mockedData";
import { Search, Filter, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    deadline: "all",
  });

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
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Research Topics</h1>
          </div>
          <p className="text-gray-600">Browse and apply for available research opportunities</p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-indigo-600" />
                <h2 className="font-semibold text-gray-800">Filters</h2>
              </div>
              <TopicsFilter filters={filters} setFilters={setFilters} />
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div 
            className="lg:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {/* Search bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
              </div>
            </div>

            {/* Topics list */}
            <TopicsList topics={mockedTopics} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;
