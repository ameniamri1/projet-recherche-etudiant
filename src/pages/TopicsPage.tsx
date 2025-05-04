
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TopicsList from "@/components/topics/TopicsList";
import TopicsFilter from "@/components/topics/TopicsFilter";
import { getTopics } from "@/utils/crudUtils";
import { Search, Filter, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Topic } from "@/types/types";

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    deadline: "all",
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);

  // Load topics from local storage
  useEffect(() => {
    const loadedTopics = getTopics();
    setTopics(loadedTopics);
    setFilteredTopics(loadedTopics);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...topics];
    
    // Apply category filter
    if (filters.category !== "all") {
      const formattedCategory = filters.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      result = result.filter(topic => 
        topic.category.toLowerCase() === formattedCategory.toLowerCase()
      );
    }
    
    // Apply deadline filter
    if (filters.deadline !== "all") {
      const now = new Date();
      const oneWeek = new Date();
      oneWeek.setDate(now.getDate() + 7);
      const oneMonth = new Date();
      oneMonth.setDate(now.getDate() + 30);
      
      result = result.filter(topic => {
        const deadlineDate = new Date(topic.deadline);
        
        if (filters.deadline === "this-week") {
          return deadlineDate <= oneWeek;
        } else if (filters.deadline === "this-month") {
          return deadlineDate <= oneMonth;
        }
        return true;
      });
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(topic => 
        topic.title.toLowerCase().includes(query) || 
        topic.description.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredTopics(result);
  }, [topics, filters, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter logic is handled by the useEffect
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
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Sujets de Recherche</h1>
          </div>
          <p className="text-gray-600">Parcourez et postulez aux opportunités de recherche disponibles</p>
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
                <h2 className="font-semibold text-gray-800">Filtres</h2>
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
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher des sujets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Rechercher</Button>
              </form>
            </div>

            {/* Topics list */}
            {filteredTopics.length > 0 ? (
              <TopicsList topics={filteredTopics} />
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-lg font-medium text-gray-600">Aucun sujet trouvé</p>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;
